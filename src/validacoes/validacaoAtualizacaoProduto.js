const yup = require('./configuracao');

const validacaoAtualizacaoProduto = yup.object().shape({
  nome: yup.string().strict().max(50).trim(),
  descricao: yup.string().strict().max(80).trim(),
  foto: yup.string().strict().trim(),
  preco: yup.number(),
  permiteObservacoes: yup.boolean()
});

module.exports = validacaoAtualizacaoProduto;