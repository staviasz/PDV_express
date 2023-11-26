const bcrypt = require('bcrypt');
const knex = require('knex')(require('../../knexfile'));
const { isValid } = require('../utils/validators/validateUser');

const {
  errorResponse400,
  errorResponse500
} = require('../utils/responses/errorResponse');
const {
  successResponse200,
  successResponse201,
  successResponse204,
} = require('../utils/responses/successResponse');


const createUser = async (req, res) => {
  const { nome: name, email, senha: password } = req.body;
  const { valid, message } = await isValid(name, email, password, knex);
  if (!valid) {
    return errorResponse400(res, message)
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await knex('usuarios')
      .insert({
        nome: name,
        email,
        senha: hashedPassword
      }, '*');

    const { senha, ...user } = newUser[0];
    return successResponse201(res, user);

  } catch (error) {
    return errorResponse500(res);
  }
}

module.exports = {
  createUser
};