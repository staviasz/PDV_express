const dbConfig = require("../../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);
const email = require("./emailConfig");

const sendMail = async (order, orderProducts, productValue) => {

    const customer = await knex('clientes')
        .where({ id: order.cliente_id })
        .first();

    const products = productValue.map(item => {
        const orderProduct = orderProducts.find(op => op.produto_id === item.id);
        const noImage = "https://i.ibb.co/nQsWkjb/produto-sem-imagem.webp"

        return {
            image_url: item.produto_imagem || noImage,
            name: item.descricao,
            quantity: orderProduct ? orderProduct.quantidade_produto : 0,
            price: item.valor
        };
    });

    const context = {
        name_client: customer.nome,
        order_id: order.id,
        products,
        total: order.valor_total,
        zip_code: customer.cep,
        road: customer.rua,
        city: customer.cidade,
        house_number: customer.numero,
        state: customer.estado,
        neighborhood: customer.bairro
    };

    const html = await email.compiladorHtml('./src/utils/templates/createOrder.html', context)
    const to = customer.email

    email.send(to, html, order.id)
}

module.exports = sendMail;
