require('dotenv').config();

const jwt = require('jsonwebtoken');
const db = require('knex')(require('../../knexfile'));
const error = require('../utils/responses/errorResponse');

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return error.errorResponse401(res, 'Usuario Não autorizado');
  }

  try {
    const token = authorization.replace('Bearer ', '').trim();

    const { id } = jwt.verify(token, process.env.SECRET_JWT);

    const dataUser = await db('usuarios').where({ id }).first();

    if (!dataUser) {
      return error.errorResponse404(res, 'Usuario não encontrado');
    }

    const user = {
      id: dataUser.id,
      nome: dataUser.nome,
      email: dataUser.email,
    };

    req.user = user;

    next();
  } catch (error) {
    return error.errorResponse401(res, 'Usuario Não autorizado');
  }
};

module.exports = { verifyLogin };
