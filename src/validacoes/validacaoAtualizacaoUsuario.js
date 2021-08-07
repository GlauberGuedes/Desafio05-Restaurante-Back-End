function validarAtualizacaoUsuario(
  nome,
  email,
  senha,
  nomeRestaurante,
  idCategoria,
  descricao,
  taxaEntrega,
  tempoEntregaEmMinutos,
  valorMinimoPedido
) {
  if (!nome) {
    return "O campo 'nome' é obrigatório.";
  }
  if (typeof nome !== "string") {
    return "O campo 'nome' precisa ser preenchido com um texto.";
  }
  if (!nome.trim()) {
    return "O campo 'nome' é obrigatório";
  }
  if (nome.length > 100) {
    return "O campo 'nome' deve conter, no máximo, 100 caracteres.";
  }
  if (!email) {
    return "O campo 'email' é obrigatório.";
  }
  if (typeof email !== "string") {
    return "O campo 'email' precisa ser preenchido com um texto.";
  }
  if (!email.trim()) {
    return "O campo 'email' é obrigatório.";
  }
  if (email.length > 100) {
    return "O campo 'email' deve conter, no máximo, 100 caracteres.";
  }
  if (!email.includes("@")) {
    return "O campo 'email' está incorreto.";
  }
  const indice = email.indexOf("@");
  if (!email.includes(".", indice)) {
    return "O campo 'email' está incorreto.";
  }
  if (senha) {
    if (typeof senha !== "string") {
      return "O campo 'senha' precisa ser preenchido com um texto.";
    }
    if (!senha.trim()) {
      return "O campo 'senha' não pode ser espaços vazios.";
    }
    if (senha.length < 6) {
      return "O campo 'senha' deve conter, no mínimo, 6 caracteres.";
    }
  }
  if (!nomeRestaurante) {
    return "O campo 'nome do restaurante' é obrigatório.";
  }
  if (typeof nomeRestaurante !== "string") {
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
  if (descricao) {
    if (descricao.length > 100) {
      return "O campo 'descricao' deve conter, no máximo, 100 caracteres.";
    }
  }
  if (!Number(idCategoria)) {
    return "O campo 'idCategoria' precisa ser um numero.";
  }
  if (!taxaEntrega) {
    return "O campo 'taxa de entrega' é obrigatório.";
  }
  if (!Number(taxaEntrega)) {
    return "O campo 'taxa de entrega' é obrigatório e precisa ser um número inteiro.";
  }
  if (String(taxaEntrega).includes(".")) {
    return "O campo 'taxa de entrega' precisa ser um número inteiro.";
  }
  if (!tempoEntregaEmMinutos) {
    return "O campo 'taxa de entrega' é obrigatório.";
  }
  if (!Number(tempoEntregaEmMinutos)) {
    return "O campo 'tempo estimado de entrega' é obrigatório e precisa ser um número.";
  }
  if (String(tempoEntregaEmMinutos).includes(".")) {
    return "O campo 'tempo estimado de entrega' precisa ser um número inteiro.";
  }  
  if (!valorMinimoPedido) {
    return "O campo 'taxa de entrega' é obrigatório.";
  }
  if (!Number(valorMinimoPedido)) {
    return "O campo 'valor mínimo do pedido' é obrigatório e precisa ser um número inteiro.";
  }
  if (String(valorMinimoPedido).includes(".")) {
    return "O campo 'valor mínimo do pedido' precisa ser um número inteiro.";
  }
}

module.exports = validarAtualizacaoUsuario;
