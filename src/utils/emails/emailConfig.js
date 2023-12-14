require("dotenv").config();
const nodemailer = require('nodemailer');

const fs = require('fs/promises')
const handlebars = require('handlebars')

const compiladorHtml = async (arquivo, contexto) => {
    const html = await fs.readFile(arquivo)
    const compilador = handlebars.compile(html.toString())
    const htmlString = compilador(contexto)
    return htmlString
}

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const send = (to, html, order_id) => {
    transporter.sendMail({
        from: `BitBárbaros Team 10<${process.env.MAIL_FROM}>`,
        to,
        subject: `Confirmação de Pedido #${order_id}`,
        html
    });
};

module.exports = {
    send,
    compiladorHtml
};
