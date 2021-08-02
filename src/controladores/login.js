const knex = require("../conexao");
const bcrypt = require("bcrypt");
const validacaoLoginUsuario = require("../validacoes/validacaoLoginUsuario");
const senhaHash = require("../senhaHash");
const jwt = require('jsonwebtoken');

async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  try {
    await validacaoLoginUsuario.validate(req.body);

    const usuario = await knex("usuario").where("email", "ilike", email).first();

    if (!usuario) {
      return res.status(404).json("O usuario não foi encontrado");
    }

    const restaurante = await knex("restaurante").where({usuario_id: usuario.id}).first();

    if (!restaurante) {
      return res.status(404).json("O restaurante não foi encontrado");
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(400).json("Email e senha não confere");
    }

    const token = jwt.sign({ id: usuario.id }, senhaHash);

    const { senha: _, ...dadosUsuario } = usuario;

    return res.status(200).json({ usuario: dadosUsuario, restaurante, token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { loginUsuario };
