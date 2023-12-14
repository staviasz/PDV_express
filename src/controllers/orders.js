require("dotenv").config();

const dbConfig = require("../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);
const validateOrder = require("../utils/validators/validateOrder")

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

        const errorOrder = await validateOrder(knex, { customer_id, order_products });
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
};

module.exports = {
    createOrder
};
