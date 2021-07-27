const knex = require("../conexao");

async function preCadastroDeCategorias(req, res) {
    try {
        const categorias = await knex("categoria");

        if (categorias.length === 0) {
            return res.status(400).json("Nenhuma categoria encontrada.");
        }

        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    preCadastroDeCategorias
}