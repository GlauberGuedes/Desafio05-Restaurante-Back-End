const knex = require("../conexao"); 

async function listarProdutos(req, res) {
    const { restaurante } = req;
    
    try {
        const produtos = await knex('produto').where({ restaurante_id: restaurante.id });

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function obterProduto(req, res) {
    const { restaurante } = req;
    const { id } = req.params;

    try {
        const produto = await knex('produto').where({ id, restaurante_id: restaurante.id }).first();

        if (!produto) {
            return res.status(404).json('Produto não encontrado.');
        }

        return res.status(200).json(produto);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarProdutos,
    obterProduto,
}