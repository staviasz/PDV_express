const { emailValidator } = require('./email');
const { nameValidator } = require('./name');
const { passwordValidator } = require('./password');

const isValid = async (name, email, password, database) => {
  const { valid: validName, message: messageName } = await nameValidator(name);
  if (!validName) return { valid: validName, message: messageName };

  const { valid: validEmail, message: messageEmail } = await emailValidator(
    email,
    database,
  );
  if (!validEmail) return { valid: validEmail, message: messageEmail };

  const { valid: validPassword, message: messagePassword } =
    await passwordValidator(password);
  if (!validPassword) return { valid: validPassword, message: messagePassword };

  return { valid: true };
};

module.exports = { isValid };
