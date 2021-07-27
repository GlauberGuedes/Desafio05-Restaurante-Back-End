const yup = require('./configuracao');

const validacaoLoginUsuario = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().required()
});

module.exports = validacaoLoginUsuario;