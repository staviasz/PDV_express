require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../../knexfile'));

const errorRes = require('../utils/responses/errorResponse');
const successRes = require('../utils/responses/successResponse');
const validateUser = require('../utils/validators/validateUser');
const validateLogin = require('../utils/validators/validateLogin');

const createUser = async (req, res) => {
  const { nome: name, email, senha: password } = req.body;

  try {
    const messageError = await validateUser(knex, { name, email, password });
    if (messageError) return errorRes.errorResponse404(res, messageError);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await knex('usuarios').insert(
      {
        nome: name,
        email,
        senha: hashedPassword,
      },
      '*',
    );

    // eslint-disable-next-line no-unused-vars
    const { senha, ...user } = newUser[0];
    return successRes.successResponse201(res, user);
  } catch (error) {
    console.log(error);
    return errorRes.errorResponse500(res, error.message);
  }
};

const updateUser = async (req, res) => {
  const { nome: name, email, senha: password } = req.body;
  const { id } = req.user;

  try {
    const messageError = await validateUser(
      knex,
      { name, email, password },
      id,
    );
    if (messageError) return errorRes.errorResponse404(res, messageError);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await knex('usuarios')
      .where({ id })
      .update({ nome: name, email, senha: hashedPassword }, '*');

    // eslint-disable-next-line no-unused-vars
    const { senha, ...user } = newUser[0];
    return successRes.successResponse201(res, user);
  } catch (error) {
    console.log(error);
    return errorRes.errorResponse500(res, error.message);
  }
};

const login = async (req, res) => {
  const { email, senha: password } = req.body;

  try {
    const existsUser = await validateLogin(knex, { email, password });
    if (typeof existsUser === 'string')
      return errorRes.errorResponse404(res, existsUser);

    const correctPassword = await bcrypt.compare(password, existsUser.senha);
    if (!correctPassword) {
      return errorRes.errorResponse400(res, 'Email e senha não confere');
    }

    const token = jwt.sign({ id: existsUser.id }, process.env.SECRET_JWT, {
      expiresIn: '8h',
    });

    // eslint-disable-next-line no-unused-vars
    const { senha: _, ...user } = existsUser;

    return successRes.successResponse200(res, {
      usuario: user,
      token,
    });
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

module.exports = {
  createUser,
  updateUser,
  login,
};
