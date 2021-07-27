const knex = require("../conexao");
const validacaoCadastroUsuario = require("../validacoes/validacaoCadastroUsuario");
const validacaoCadastroRestaurante = require("../validacoes/validacaoCadastroRestaurante");
const bcrypt = require("bcrypt");

async function cadastrarUsuario(req, res) {
  const { nome, email, senha, restaurante } = req.body;

  try {
    await validacaoCadastroUsuario.validate({ nome, email, senha });

    await validacaoCadastroRestaurante.validate(restaurante);

    const emailCadastrado = await knex("usuario").where("email", email);

    if (emailCadastrado.length > 0) {
      return res.status(400).json("Este email já foi cadastrado.");
    }

    const nomeRestauranteCadastrado = await knex("restaurante").where(
      "nome",
      restaurante.nome
    );

    if (nomeRestauranteCadastrado.length > 0) {
      return res.status(400).json("Já existe um restaurante com esse nome.");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioCadastrado = await knex("usuario")
      .insert({ nome, email, senha: senhaCriptografada })
      .returning("*");

    if (usuarioCadastrado.length === 0) {
      return res.status(400).json("O usuário não foi cadastrado.");
    }

    const restauranteCadastrado = await knex("restaurante")
      .insert({
        usuario_id: usuarioCadastrado[0].id,
        nome: restaurante.nome,
        descricao: restaurante.descricao,
        categoria_id: restaurante.idCategoria,
        taxa_entrega: restaurante.taxaEntrega,
        tempo_entrega_minutos: restaurante.tempoEntregaEmMinutos,
        valor_minimo_pedido: restaurante.valorMinimoPedido,
      })
      .returning("*");

    if (restauranteCadastrado.length === 0) {
      await knex('usuario').del().where({id: usuarioCadastrado[0].id});
      return res.status(400).json("Erro no cadastro do restaurante.");
    }

    return res
      .status(200)
      .json("Usuário e restaurante cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { cadastrarUsuario };
