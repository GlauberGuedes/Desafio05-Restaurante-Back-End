function validarLogin(email, senha) {
  if (!email.trim()) {
    return "O campo 'email' é obrigatório.";
  }
  if (!senha.trim()) {
    return "O campo 'senha' é obrigatório.";
  }
  if (!email.includes("@")) {
    return "O campo 'email' está escrito de forma incorreta.";
  }
  const indice = email.indexOf("@");
  if (!email.includes(".", indice)) {
    return "O campo 'email' está escrito de forma incorreta.";
  }
}

module.exports = validarLogin;
