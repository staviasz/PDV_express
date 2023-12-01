const dbConfig = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(dbConfig[environment]);

const errorRes = require('../utils/responses/errorResponse');
const successRes = require('../utils/responses/successResponse');
const validateClient = require('../utils/validators/validateClient');

const registerClient = async (req, res) => {
  const { nome: name, email, cpf } = req.body;

  try {
    const messageError = await validateClient(knex, { name, email, cpf });
    if (messageError) return errorRes.errorResponse400(res, messageError);

    const newClient = await knex('clientes').insert(
      {
        nome: name,
        email,
        cpf,
      },
      '*',
    );

    return successRes.successResponse201(res, newClient[0]);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

const updateClient = async (req, res) => {
  const { nome: name, email, cpf } = req.body;
  const { id } = req.params;

  try {
    const messageError = await validateClient(knex, { name, email, cpf }, id);
    if (messageError) return errorRes.errorResponse400(res, messageError);

    const newClient = await knex('clientes').where({ id }).update(
      {
        nome: name,
        email,
        cpf,
      },
      '*',
    );

    return successRes.successResponse200(res, newClient[0]);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

module.exports = { registerClient, updateClient };
