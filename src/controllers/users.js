require('dotenv').config();

const bcrypt = require('bcrypt');
const db = require('knex')(require('../../knexfile'));
const jwt = require('jsonwebtoken');

const error = require('../utils/responses/errorResponse');
const { successResponse200 } = require('../utils/responses/successResponse');
const { requestLogin } = require('../utils/validators/login');

const login = async (req, res) => {
  const { email, senha: password } = req.body;

  try {
    await requestLogin.validateAsync(req.body);
  } catch (error) {
    return await res.status(400).json({ mensagem: error.message });
  }

  try {
    const user = await db('usuarios').where({ email }).first();

    if (!user) {
      return error.errorResponse400(res, 'O usuario não foi encontrado');
    }

    const correctPassword = await bcrypt.compare(password, user.senha);

    if (!correctPassword) {
      return error.errorResponse400(res, 'Email e senha não confere');
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
      expiresIn: '8h',
    });

    const dataUser = {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };

    return successResponse200(res, {
      usuario: dataUser,
      token,
    });
  } catch (error) {
    return error.errorResponse500(res);
  }
};

module.exports = { login };
