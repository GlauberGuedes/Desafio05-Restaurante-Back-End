const yup = require('./configuracao');

const validacaoCadastroProduto = yup.object().shape({
  nome: yup.string().strict().required().max(50).trim(),
  descricao: yup.string().required().max(80),
  foto: yup.string(),
  preco: yup.number().required(),
  ativo: yup.boolean().required(),
  permiteObservacoes: yup.boolean().required()
});

module.exports = validacaoCadastroProduto;