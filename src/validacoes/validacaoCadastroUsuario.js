function validarUsuario(nome, email, senha) {
  if (!nome) {
    return "O campo 'nome' é obrigatório.";
  }
  if (typeof nome !== 'string') {
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
  if (typeof email !== 'string') {
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
  if (!senha) {
    return "O campo 'senha' é obrigatório.";
  }
  if (typeof senha !== 'string') {
    return "O campo 'senha' precisa ser preenchido com um texto.";
  }
  if (!senha.trim()) {
    return "O campo 'senha' é obrigatório.";
  }
  if(senha.length < 6) {
    return "O campo 'senha' deve conter, no mínimo, 6 caracteres.";
  }
}

module.exports = validarUsuario;
