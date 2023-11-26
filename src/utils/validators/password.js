const passwordValidator = async (password) => {

  if (!password) {
    return { valid: false, message: 'O campo Senha é Obrigatório' }
  }

  return { valid: true }
}

module.exports = { passwordValidator };
