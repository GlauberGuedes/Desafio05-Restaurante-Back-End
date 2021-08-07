function validarLogin(email, senha) {
  if (!email) {
    return "O campo 'email' é obrigatório.";
  }
  if (typeof email !== 'string') {
    return "O campo 'email' precisa ser preenchido com um texto.";
  }
  if (!email.trim()) {
    return "O campo 'email' é obrigatório.";
  }
  if (!email.includes("@")) {
    return "O campo 'email' está escrito de forma incorreta.";
  }
  const indice = email.indexOf("@");
  if (!email.includes(".", indice)) {
    return "O campo 'email' está escrito de forma incorreta.";
  }
  if (!senha) {
    return "O campo 'senha' é obrigatório.";
  }
}

module.exports = validarLogin;
