const bcrypt = require('bcrypt');
const db = require('knex')(require('../../knexfile'));
const { isValid } = require('../utils/validators/validateUser');

const {
  errorResponse400,
  errorResponse500
} = require('../utils/responses/errorResponse');
const {
  successResponse200,
  successResponse204,
} = require('../utils/responses/successResponse');


const createUser = async (req, res) => {
  const { nome: name, email, senha: password } = req.body;
  const { valid, message } = await isValid(name, email, password, db);
  if (!valid) {
    return errorResponse400(res, message)
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db('usuarios')
      .insert({
        nome: name,
        email,
        senha: hashedPassword
      }, '*');

    const { senha, ...user } = newUser[0];
    return res.status(201).json(user);

  } catch (error) {
    return errorResponse500(res);
  }
}

module.exports = {
  createUser
};