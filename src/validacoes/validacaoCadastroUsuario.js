function validarUsuario(nome, email, senha) {
  if (!nome.trim()) {
    return "O campo 'nome' é obrigatório";
  }
  if (!email.trim()) {
    return "O campo 'email' é obrigatório.";
  }
  if (!senha.trim()) {
    return "O campo 'senha' é obrigatório.";
  }
  if (!email.includes("@")) {
    return "O campo 'email' está incorreto.";
  }
  const indice = email.indexOf("@");
  if (!email.includes(".", indice)) {
    return "O campo 'email' está incorreto.";
  }
}

module.exports = validarUsuario;
