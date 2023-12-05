require("dotenv").config();

const jwt = require("jsonwebtoken");
const dbConfig = require("../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);
const errorRes = require("../utils/responses/errorResponse");

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return errorRes.errorResponse401(res, "Usuario não autorizado");
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, process.env.SECRET_JWT);

    const dataUser = await knex("usuarios").where({ id }).first();
    if (!dataUser) {
      return errorRes.errorResponse404(res, "Usuario não encontrado");
    }

    // eslint-disable-next-line no-unused-vars
    const { senha: _, ...user } = dataUser;

    req.user = user;

    next();
  } catch (error) {
    return errorRes.errorResponse401(res, "Usuario Não autorizado");
  }
};

module.exports = verifyLogin;
