require("dotenv").config();

const dbConfig = require("../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);

const errorRes = require("../utils/responses/errorResponse");
const successRes = require("../utils/responses/successResponse");
const validates = require("../utils/validators/validateProduct");

const createProduct = async (req, res) => {
  const {
    descricao: description,
    quantidade_estoque: amount,
    valor: value,
    categoria_id: category_id,
  } = req.body;

  try {
    const validProduct = await validates.validateProduct(
      knex,
      {
        description,
        amount,
        value,
        category_id,
      },
      category_id,
    );
    if (validProduct) {
      return errorRes.errorResponse400(res, validProduct);
    }

    const [product] = await knex("produtos").insert(
      {
        descricao: description,
        valor: value,
        quantidade_estoque: amount,
        categoria_id: category_id,
      },
      "*",
    );

    return successRes.successResponse201(res, product);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const {
    descricao: description,
    quantidade_estoque: amount,
    valor: value,
    categoria_id: category_id,
  } = req.body;

  try {
    const validProduct = await validates.validateProduct(
      knex,
      {
        description,
        amount,
        value,
        category_id,
      },
      category_id,
      id,
    );
    if (typeof validProduct === "string") {
      return errorRes.errorResponse400(res, validProduct);
    }

    const [product] = await knex("produtos")
      .update(
        {
          descricao: description,
          valor: value,
          quantidade_estoque: amount,
          categoria_id: category_id,
        },
        "*",
      )
      .where({ id });
    return successRes.successResponse200(res, product);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

const detailProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const [product] = await knex("produtos").where({ id });

    if (!product) {
      return errorRes.errorResponse404(res, "Produto não encontrado.");
    }
    return successRes.successResponse200(res, product);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

const getProduct = async (req, res) => {
  const { categoria_id } = req.query;
  try {
    const query = knex("produtos");

    if (categoria_id) {
      const categoryExist = await knex("categorias")
        .where({ id: categoria_id })
        .first();
      if (!categoryExist) {
        return errorRes.errorResponse400(
          res,
          "A categoria solicitada não existe",
        );
      }
      query.where({ categoria_id });
    }

    const products = await query;

    return successRes.successResponse200(res, products);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

const delProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await validates.validateDelProduct(knex, id);
    if (response) {
      return errorRes.errorResponse400(res, response);
    }

    return successRes.successResponse204(res);
  } catch (error) {
    return errorRes.errorResponse500(res, error.message);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  detailProduct,

  getProduct,
  delProduct,
};
