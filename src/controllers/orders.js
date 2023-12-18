require("dotenv").config();

const dbConfig = require("../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);
const validates = require("../utils/validators/validateOrder");

const errorRes = require("../utils/responses/errorResponse");
const successRes = require("../utils/responses/successResponse");
const sendMail = require("../utils/emails/emailSend");

const createOrder = async (req, res) => {
    const trx = await knex.transaction();

    try {
        const {
            cliente_id: customer_id,
            pedido_produtos: order_products,
            observacao: observation,
        } = req.body;

        const errorOrder = await validates.validateOrder(knex, { customer_id, order_products, observation });
        if (errorOrder) {
            return errorRes.errorResponse400(res, errorOrder);
        };

        const productValues = await trx('produtos')
            .select('*')
            .whereIn('id', order_products.map(product => product.produto_id));

        const amounts = order_products.map((product) => {
            const productValue = productValues.find(value => value.id === product.produto_id);
            return productValue.valor * product.quantidade_produto;
        });
        const totalAmount = amounts.reduce((a, b) => a + b, 0);

        const order = await trx('pedidos')
            .insert({
                cliente_id: customer_id,
                observacao: observation,
                valor_total: totalAmount
            }, '*');

        const orderProducts = order_products.map((product) => {
            const productValue = productValues.find(value => value.id === product.produto_id);
            return {
                pedido_id: order[0].id,
                produto_id: product.produto_id,
                quantidade_produto: product.quantidade_produto,
                valor_produto: productValue.valor
            };
        });
        await trx('pedido_produtos').insert(orderProducts);

        for (const product of order_products) {
            const currentQuantity = productValues.find(value => value.id === product.produto_id);
            const newQuantity = currentQuantity.quantidade_estoque - product.quantidade_produto;
            await trx('produtos')
                .update({ quantidade_estoque: newQuantity })
                .where({ id: product.produto_id });
        };

        await trx.commit();
        sendMail(order[0], orderProducts, productValues);
        return successRes.successResponse201(res, order[0]);

    } catch (error) {
        await trx.rollback();
        return errorRes.errorResponse500(res, error.message);

    }

    const productValues = await trx("produtos")
      .select("*")
      .whereIn(
        "id",
        order_products.map((product) => product.produto_id)
      );

    const amounts = order_products.map((product) => {
      const productValue = productValues.find(
        (value) => value.id === product.produto_id
      );
      return productValue.valor * product.quantidade_produto;
    });
    const totalAmount = amounts.reduce((a, b) => a + b, 0);

    const [order] = await trx("pedidos").insert(
      {
        cliente_id: customer_id,
        observacao: observation,
        valor_total: totalAmount
      },
      "*"
    );

    const orderProducts = order_products.map((product) => {
      const productValue = productValues.find(
        (value) => value.id === product.produto_id
      );
      return {
        pedido_id: order.id,
        produto_id: product.produto_id,
        quantidade_produto: product.quantidade_produto,
        valor_produto: productValue.valor
      };
    });
    await trx("pedido_produtos").insert(orderProducts);

    for (const product of order_products) {
      const currentQuantity = productValues.find(
        (value) => value.id === product.produto_id
      );
      const newQuantity =
        currentQuantity.quantidade_estoque - product.quantidade_produto;
      await trx("produtos")
        .update({ quantidade_estoque: newQuantity })
        .where({ id: product.produto_id });
    }

    await trx.commit();
    sendMail(order, orderProducts, productValues);
    return successRes.successResponse201(res, order);
  } catch (error) {
    await trx.rollback();
    return errorRes.errorResponse500(res, error.message);
  }
};

const listOrder = async (req, res) => {
  const { cliente_id: customer_id } = req.query;

  const errorOrder = await validates.validadeListOrder(customer_id);
  if (errorOrder) return errorRes.errorResponse400(res, errorOrder);

  try {
    let query = knex("pedidos")
      .select(
        "pedidos.id as pedido_id",
        "pedidos.valor_total",
        "pedidos.observacao",
        "pedidos.cliente_id",
        "pedido_produtos.id as produto_id",
        "pedido_produtos.quantidade_produto",
        "pedido_produtos.valor_produto",
        "pedido_produtos.pedido_id as produto_pedido_id",
        "pedido_produtos.produto_id"
      )
      .leftJoin("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id");

    if (customer_id) {
      query = query.where({ "pedidos.cliente_id": customer_id });
    }

    const orders = await query;
    if (!orders.length) {
      return errorRes.errorResponse400(
        res,
        `Cliente com ID ${customer_id} não foi localizado`
      );
    }

    const formattedOrders = orders.reduce((acc, order) => {
      const existingOrder = acc.find(
        (item) => item.pedido.id === order.pedido_id
      );

      const pedido_produto = {
        id: order.produto_id,
        quantidade_produto: order.quantidade_produto,
        valor_produto: order.valor_produto,
        pedido_id: order.produto_pedido_id,
        produto_id: order.produto_id
      };

      if (existingOrder) {
        existingOrder.pedido_produtos.push(pedido_produto);
      } else {
        acc.push({
          pedido: {
            id: order.pedido_id,
            valor_total: order.valor_total,
            observacao: order.observacao,
            cliente_id: order.cliente_id
          },
          pedido_produtos: [pedido_produto]
        });
      }

      return acc;
    }, []);

    return res.json(formattedOrders);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

module.exports = {
  createOrder,
  listOrder
};
