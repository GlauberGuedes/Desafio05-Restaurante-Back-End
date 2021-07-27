const yup = require('./configuracao');

const validacaoCadastroUsuario = yup.object().shape({
  nome: yup.string().strict().required().trim(),
  email: yup.string().email().required(),
  senha: yup.string().required()
});

module.exports = validacaoCadastroUsuario;