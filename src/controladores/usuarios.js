const knex = require("../conexao");
const validarUsuario = require("../validacoes/validacaoCadastroUsuario");
const validarAtualizacaoUsuario = require("../validacoes/validacaoAtualizacaoUsuario");
const bcrypt = require("bcrypt");
const supabase = require("../supabase");
const excluirImagem = require("../utils/excluirImagem");
const cadastrarImagem = require("../utils/cadastrarImagem");

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
    const erroValidacaoUsuario = validarUsuario(
      nome,
      email,
      senha,
      nomeRestaurante,
      idCategoria,
      descricao,
      taxaEntrega,
      tempoEntregaEmMinutos,
      valorMinimoPedido
    );

    if (erroValidacaoUsuario) {
      return res.status(400).json(erroValidacaoUsuario);
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

async function atualizarUsuario(req, res) {
  const { nome, email, senha, restaurante } = req.body;
  const { usuario, restaurante: usuarioRestaurante } = req;
  let urlImagem;
  let senhaCriptografada;
  let nomeDaImagem = `usuario${usuario.id}/avatar`;

  const {
    nome: nomeRestaurante,
    idCategoria,
    descricao,
    taxaEntrega,
    tempoEntregaEmMinutos,
    valorMinimoPedido,
    imagem,
  } = restaurante;

  try {
    const erroValidacaoUsuario = validarAtualizacaoUsuario(
      nome,
      email,
      senha,
      nomeRestaurante,
      idCategoria,
      descricao,
      taxaEntrega,
      tempoEntregaEmMinutos,
      valorMinimoPedido
    );

    if (erroValidacaoUsuario) {
      return res.status(400).json(erroValidacaoUsuario);
    }

    if (email !== usuario.email) {
      const emailCadastrado = await knex("usuario").where(
        "email",
        "ilike",
        email
      );

      if (emailCadastrado.length > 0) {
        return res.status(400).json("Este email já foi cadastrado.");
      }
    }

    if (nomeRestaurante !== usuarioRestaurante.nome) {
      const nomeRestauranteCadastrado = await knex("restaurante").where(
        "nome",
        "ilike",
        nomeRestaurante
      );

      if (nomeRestauranteCadastrado.length > 0) {
        return res.status(400).json("Já existe um restaurante com esse nome.");
      }
    }

    if (imagem) {
      if (usuarioRestaurante.imagem) {
        const nomeDaImagemDB = usuarioRestaurante.imagem.replace(
          `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/`,
          ""
        );
        const erroAoExcluir = await excluirImagem(nomeDaImagemDB);

        if (erroAoExcluir) {
          return res.status(400).json(erroAoExcluir);
        }

        nomeDaImagem =
          `usuario${usuario.id}/avatar` + Math.floor(Math.random() * 10000);
      }
      const buffer = Buffer.from(imagem, "base64");

      const imagemCadastrada = await cadastrarImagem(nomeDaImagem, buffer);

      if(imagemCadastrada.erro) {
        return res.status(400).json(imagemCadastrada.erro);
      }

      urlImagem = imagemCadastrada.url;
    }

    if (senha) {
      senhaCriptografada = await bcrypt.hash(senha, 10);
    }

    const usuarioAtualizado = await knex("usuario")
      .where({ id: usuario.id })
      .update({
        nome,
        email,
        senha: senhaCriptografada,
      });

    if (!usuarioAtualizado) {
      const erroAoExcluir = await excluirImagem(nomeDaImagem);

      if (erroAoExcluir) {
        return res.status(400).json(erroAoExcluir);
      }
      return res.status(400).json("Erro ao atualizar usuario.");
    }

    const restauranteAtualizado = await knex("restaurante")
      .where({ id: usuarioRestaurante.id })
      .update({
        nome: restaurante.nome,
        descricao: restaurante.descricao,
        categoria_id: restaurante.idCategoria,
        taxa_entrega: restaurante.taxaEntrega,
        tempo_entrega_minutos: restaurante.tempoEntregaEmMinutos,
        valor_minimo_pedido: restaurante.valorMinimoPedido,
        imagem: urlImagem,
      });

    if (!restauranteAtualizado) {
      const erroAoExcluir = await excluirImagem(nomeDaImagem);

      if (erroAoExcluir) {
        return res.status(400).json(erroAoExcluir);
      }
      return res.status(400).json("Erro ao atualizar restaurante.");
    }

    return res.status(200).json("Usuário atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function obterUsuario(req, res) {
  const { usuario } = req;

  const dadosRestaurante = await knex("restaurante")
    .join("categoria", "categoria_id", "categoria.id")
    .select(
      "restaurante.*",
      "categoria.nome as nomeCategoria",
      "categoria.imagem as imagemCategoria"
    )
    .where({ usuario_id: usuario.id })
    .first();

  if (dadosRestaurante.length === 0) {
    return res.status(400).json("Restaurante não foi encontrado.");
  }

  return res.json({ usuario, restaurante: dadosRestaurante });
}

module.exports = { cadastrarUsuario, atualizarUsuario, obterUsuario };
