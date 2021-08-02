function validarRestaurante(
  nomeRestaurante,
  idCategoria,
  taxaEntrega,
  tempoEntregaEmMinutos,
  valorMinimoPedido
) {
  if (!nomeRestaurante.trim()) {
    return "O campo 'nome' é obrigatório";
  }
  if (!idCategoria) {
    return "O campo 'categoria' é obrigatório.";
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
