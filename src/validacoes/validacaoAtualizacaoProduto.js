function validacaoAtualizacaoProduto(
  nome,
  descricao,
  foto,
  preco,
  permiteObservacoes
) {

  if (nome) {
    if (typeof nome !== 'string') {
      return "O campo 'nome' precisa ser preenchido com um texto.";
    }
    if (nome.length > 50) {
      return "O campo 'nome' deve conter, no máximo, 50 caracteres.";
    }
  }

  if (descricao) {
    if (typeof descricao !== 'string') {
      return "O campo 'descricao' precisa ser preenchido com um texto.";
    }
    if (descricao.length > 80) {
      return "O campo 'descricao' deve conter, no máximo, 80 caracteres.";
    }
  }

  if (foto) {
    if (typeof foto !== 'string') {
      return "O campo 'foto' precisa ser preenchido com um texto.";
    }
  }

  if (preco) {
    if (typeof preco !== 'number') {
      return "O campo 'preco' precisa ser preenchido com um número.";
    }
  }

  if (permiteObservacoes) {
    if (typeof permiteObservacoes !== 'boolean') {
      return "O campo 'permiteObservacoes' precisa ser preenchido com um valor booleano(true/false).";
    }
  }
}

module.exports = validacaoAtualizacaoProduto;
