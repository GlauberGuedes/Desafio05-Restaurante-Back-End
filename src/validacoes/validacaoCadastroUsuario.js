const yup = require('./configuracao');

const validacaoCadastroUsuario = yup.object().shape({
  nome: yup.string().strict().required().trim().max(100),
  email: yup.string().email().required().max(100),
  senha: yup.string().required().min(6).trim()
});

module.exports = validacaoCadastroUsuario;