const knex = require("../conexao");
const validarUsuario = require("../validacoes/validacaoCadastroUsuario");
const validarRestaurante = require("../validacoes/validacaoCadastroRestaurante");
const bcrypt = require("bcrypt");

async function cadastrarUsuario(req, res) {
  const { nome, email, senha, restaurante } = req.body;

  const {
    nome: nomeRestaurante,
    idCategoria,
    descricao,
    taxaEntrega,
    tempoEntregaEmMinutos,
    valorMinimoPedido,
  } = restaurante;

  try {
    const erroValidacaoUsuario = validarUsuario(nome, email, senha);

    if (erroValidacaoUsuario) {
      return res.status(400).json(erroValidacaoUsuario);
    }

    const erroValidacaoRestaurante = validarRestaurante(
      nomeRestaurante,
      idCategoria,
      descricao,
      taxaEntrega,
      tempoEntregaEmMinutos,
      valorMinimoPedido
    );

    if (erroValidacaoRestaurante) {
      return res.status(400).json(erroValidacaoRestaurante);
    }

    const emailCadastrado = await knex("usuario").where(
      "email",
      "ilike",
      email
    );

    if (emailCadastrado.length > 0) {
      return res.status(400).json("Este email já foi cadastrado.");
    }

    const nomeRestauranteCadastrado = await knex("restaurante").where(
      "nome",
      "ilike",
      restaurante.nome
    );

    if (nomeRestauranteCadastrado.length > 0) {
      return res.status(400).json("Já existe um restaurante com esse nome.");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const emailFormatado = email.toLowerCase();

    const usuarioCadastrado = await knex("usuario")
      .insert({ nome, email: emailFormatado, senha: senhaCriptografada })
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
      await knex("usuario").del().where({ id: usuarioCadastrado[0].id });
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
