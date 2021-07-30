const yup = require('./configuracao');

const validacaoCadastroRestaurante = yup.object().shape({
  nome: yup.string().strict().required().max(50).trim(),
  descricao: yup.string().max(100),
  idCategoria: yup.number().required().min(1),
  taxaEntrega: yup.number().required(),
  tempoEntregaEmMinutos: yup.number().required(),
  valorMinimoPedido: yup.number().required()
});

module.exports = validacaoCadastroRestaurante;