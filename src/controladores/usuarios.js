const knex = require("../conexao");
const validarUsuario = require("../validacoes/validacaoCadastroUsuario");
const validarAtualizacaoUsuario = require("../validacoes/validacaoAtualizacaoUsuario");
const bcrypt = require("bcrypt");
const supabase = require("../supabase");
const excluirImagem = require("../utils/excluirImagem");

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
        const erroAoExcluir = await excluirImagem(usuario.id);

        if (erroAoExcluir) {
          return res.status(400).json(erroAoExcluir);
        }
      }
      const buffer = Buffer.from(imagem, "base64");

      const { error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(`usuario${usuario.id}/avatar`, buffer);

      if (error) {
        return res.status(400).json("Imagem não foi atualizada.");
      }

      const { publicURL, error: errorPublicURL } = supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .getPublicUrl(`usuario${usuario.id}/avatar`);

      if (errorPublicURL) {
        return res.status(400).json("Erro ao gerar url da imagem.");
      }

      urlImagem = publicURL;
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
      }).returning("*");
    
      if(usuarioAtualizado.length === 0) {
        const erroAoExcluir = await excluirImagem(usuario.id);

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
        imagem: urlImagem
      }).returning("*");
      
      if(restauranteAtualizado.lenght === 0) {
        const erroAoExcluir = await excluirImagem(usuario.id);

        if (erroAoExcluir) {
          return res.status(400).json(erroAoExcluir);
        }
        return res.status(400).json("Erro ao atualizar restaurante.");
      }

      const {senha: _, ...dadosUsuario} = usuarioAtualizado[0]
    
      return res.status(200).json({usuario: dadosUsuario, restaurante: restauranteAtualizado[0]});
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { cadastrarUsuario, atualizarUsuario };
