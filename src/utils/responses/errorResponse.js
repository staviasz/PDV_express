const errorResponse400 = (res, mensagem) => {
  return res.status(400).send({ mensagem });
};
const errorResponse401 = (res, mensagem) => {
  return res.status(401).send({ mensagem });
};
const errorResponse403 = (res, mensagem) => {
  return res.status(403).send({ mensagem });
};
const errorResponse404 = (res, mensagem) => {
  return res.status(404).send({ mensagem });
};
const errorResponse500 = (res, mensagem = "Erro no servidor") => {
  return res.status(500).send({ mensagem });
};

module.exports = {
  errorResponse400,
  errorResponse401,
  errorResponse403,
  errorResponse404,
  errorResponse500,
};
