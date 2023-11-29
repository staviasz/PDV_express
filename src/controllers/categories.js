const dbConfig = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(dbConfig[environment]);
const errorRes = require('../utils/responses/errorResponse');
const successRes = require('../utils/responses/successResponse');

const getCategories = async (req, res) => {
  try {
    const categories = await knex('categorias').select('descricao');
    return successRes.successResponse200(res, categories);
  } catch (error) {
    return errorRes.errorResponse500(error.message);
  }
};

module.exports = {
  getCategories,
};
