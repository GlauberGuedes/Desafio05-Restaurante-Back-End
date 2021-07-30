const yup = require('./configuracao');

const validacaoCadastroRestaurante = yup.object().shape({
  nome: yup.string().strict().required().trim(),
  descricao: yup.string(),
  idCategoria: yup.number().required().min(1),
  taxaEntrega: yup.number().required(),
  tempoEntregaEmMinutos: yup.number().required(),
  valorMinimoPedido: yup.number().required()
});

module.exports = validacaoCadastroRestaurante;