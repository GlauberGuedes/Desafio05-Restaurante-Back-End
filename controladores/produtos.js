const knex = require("../conexao"); 

async function listarProdutos(req, res) {
    const { restaurante } = req;
    
    try {
        const produtos = await knex('produto').where({ restaurante_id: restaurante.id });

        return res.status(200).json([produtos]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarProdutos,
}