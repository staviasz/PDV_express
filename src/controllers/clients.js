const dbConfig = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(dbConfig[environment]);

const errorRes = require('../utils/responses/errorResponse');
const successRes = require('../utils/responses/successResponse');
const validateClient = require('../utils/validators/validateClient');

const registerClient = async (req, res) => {
  const {
    cpf,
    email,
    nome: name,
    cep: zipCode,
    rua: street,
    numero: number,
    bairro: neighborhood,
    cidade: city,
    estado: state,
  } = req.body;

  try {
    const messageError = await validateClient(knex, {
      name,
      email,
      cpf,
      zipCode,
      street,
      number,
      neighborhood,
      city,
      state,
    });
    if (messageError) return errorRes.errorResponse400(res, messageError);

    const [newClient] = await knex('clientes').insert(
      {
        nome: name,
        email,
        cpf,
        cep: zipCode,
        rua: street,
        numero: number,
        bairro: neighborhood,
        cidade: city,
        estado: state,
      },
      '*',
    );

    return successRes.successResponse201(res, newClient);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

const updateClient = async (req, res) => {
  const {
    cpf,
    email,
    nome: name,
    cep: zipCode,
    rua: street,
    numero: number,
    bairro: neighborhood,
    cidade: city,
    estado: state,
  } = req.body;
  const { id } = req.params;

  try {
    const messageError = await validateClient(
      knex,
      { name, email, cpf, zipCode, street, number, neighborhood, city, state },
      id,
    );
    if (messageError) return errorRes.errorResponse400(res, messageError);

    const [newClient] = await knex('clientes').where({ id }).update(
      {
        nome: name,
        email,
        cpf,
        cep: zipCode,
        rua: street,
        numero: number,
        bairro: neighborhood,
        cidade: city,
        estado: state,
      },
      '*',
    );

    return successRes.successResponse200(res, newClient);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

const getClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await knex('clientes').where({ id }).first();
    return successRes.successResponse200(res, client);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

module.exports = { registerClient, updateClient, getClient };
