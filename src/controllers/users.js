require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../../knexfile'));
const { isValid } = require('../utils/validators/validateUser');
const { requestLogin } = require('../utils/validators/login');

const {
  errorResponse400,
  errorResponse500,
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
    return errorResponse400(res, message);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await knex('usuarios').insert(
      {
        nome: name,
        email,
        senha: hashedPassword,
      },
      '*',
    );

    const { senha, ...user } = newUser[0];
    return successResponse201(res, user);
  } catch (error) {
    return errorResponse500(res);
  }
};

const login = async (req, res) => {
  const { email, senha: password } = req.body;

  try {
    await requestLogin.validateAsync(req.body);
  } catch (error) {
    return await res.status(400).json({ mensagem: error.message });
  }

  try {
    const user = await knex('usuarios').where({ email }).first();

    if (!user) {
      return errorResponse400(res, 'O usuario não foi encontrado');
    }

    const correctPassword = await bcrypt.compare(password, user.senha);

    if (!correctPassword) {
      return errorResponse400(res, 'Email e senha não confere');
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
    return errorResponse500(res);
  }
};

module.exports = {
  createUser,
  login,
};
