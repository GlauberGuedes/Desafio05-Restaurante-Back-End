function validarRestaurante(
  nomeRestaurante,
  idCategoria,
  descricao,
  taxaEntrega,
  tempoEntregaEmMinutos,
  valorMinimoPedido
) {
  if (!nomeRestaurante) {
    return "O campo 'nome do restaurante' é obrigatório.";
  }
  if (typeof nomeRestaurante !== 'string') {
    return "O campo 'nome do restaurante' precisa ser preenchido com um texto.";
  }
  if (!nomeRestaurante.trim()) {
    return "O campo 'nome do restaurante' é obrigatório";
  }
  if (nomeRestaurante.length > 50) {
    return "O campo 'nome do restaurante' deve conter, no máximo, 50 caracteres.";
  }
  if (!idCategoria) {
    return "O campo 'categoria' é obrigatório.";
  }
  if(descricao) {
    if(descricao.length > 100) {
      return "O campo 'descricao' deve conter, no máximo, 100 caracteres.";
    }
  }
  if (!Number(idCategoria)) {
    return "O campo 'idCategoria' precisa ser um numero.";
  }
  if (!Number(taxaEntrega)) {
    return "O campo 'taxa de entrega' é obrigatório e precisa ser um número inteiro.";
  }
  if (!Number(tempoEntregaEmMinutos)) {
    return "O campo 'tempo estimado de entrega' é obrigatório e precisa ser um número.";
  }
  if (!Number(valorMinimoPedido)) {
    return "O campo 'valor mínimo do pedido' é obrigatório e precisa ser um número inteiro.";
  }
}

module.exports = validarRestaurante;
