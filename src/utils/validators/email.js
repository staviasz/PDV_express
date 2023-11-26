const emailValidator = async (email, db) => {

  if (!email) {
    return { valid: false, message: 'O campo Email é Obrigatório' }
  }
  const emailExists = await db('usuarios')
    .where({ email })
    .first();

  if (emailExists) {
    return { valid: false, message: "Já existe usuário cadastrado com o e-mail informado." }
  }
  return { valid: true }
}

module.exports = { emailValidator };

