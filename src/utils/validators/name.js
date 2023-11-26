const nameValidator = async (name) => {

  if (!name) {
    return { valid: false, message: 'O campo Nome é Obrigatório' }
  }

  return { valid: true }
}

module.exports = { nameValidator };

