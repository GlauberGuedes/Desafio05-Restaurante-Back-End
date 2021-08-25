const knex = require("../conexao");
const jwt = require("jsonwebtoken");


const verificarToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Não autorizado");
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, process.env.SENHA_HASH);

    const usuarioExiste = await knex("usuario").where({ id }).first();

    if (!usuarioExiste) {
      return res.status(404).json("Usuario não encontrado");
    }

    const restauranteUsuario = await knex("restaurante")
      .where({ usuario_id: id })
      .first();

    if (!restauranteUsuario) {
      return res.status(404).json("Restaurante não encontrado");
    }

    const { senha, ...usuario } = usuarioExiste;
    const { ...restaurante } = restauranteUsuario;

    req.usuario = usuario;
    req.restaurante = restaurante;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = verificarToken;
