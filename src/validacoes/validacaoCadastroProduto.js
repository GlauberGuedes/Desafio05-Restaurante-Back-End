function validacaoCadastroProduto(
  nome,
  descricao,
  foto,
  preco,
  ativo,
  permiteObservacoes
) {
  
  if (!nome) {
    return "O campo 'nome' é obrigatório.";
  }

  if (typeof nome !== 'string') {
    return "O campo 'nome' precisa ser preenchido com um texto.";
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

  if (!preco) {
    return "O campo 'preco' é obrigatório.";
  }

  if (typeof preco !== 'number') {
    return "O campo 'preco' precisa ser preenchido com um número.";
  }

  if (!ativo) {
    return "O campo 'ativo' é obrigatório.";
  }

  if (typeof ativo !== 'boolean') {
    return "O campo 'ativo' precisa ser preenchido com um valor booleano(true/false).";
  }

  if (!permiteObservacoes) {
    return "O campo 'permiteObservacoes' é obrigatório.";
  }

  if (typeof permiteObservacoes !== 'boolean') {
    return "O campo 'permiteObservacoes' precisa ser preenchido com um valor booleano(true/false).";
  }
}

module.exports = validacaoCadastroProduto;