const knex = require("../conexao");

async function listarPedidos(req, res) {
    const { restaurante } = req;
    
    try {
        const pedidos = await knex("pedido")
            .join("consumidor", "pedido.consumidor_id", "=", "consumidor.id")
            .join("endereco_consumidor", "pedido.consumidor_id", "=", "endereco_consumidor.consumidor_id")
            .where("restaurante_id", restaurante.id)
            .orderBy("pedido.id")
            .select(
                "pedido.id as idPedido",
                "valor_total as valorTotal",
                "saiu_para_entrega as saiuParaEntrega",
                "entregue",
                "nome as nomeConsumidor",
                "email as emailConsumidor",
                "telefone as telefoneConsumidor",
                "cep",
                "endereco",
                "complemento"
            );
        
        for (let pedido of pedidos) {
            const itensDoPedido = await knex("itens_do_pedido")
            .join("produto", "itens_do_pedido.produto_id", "=", "produto.id")
            .join("pedido", "itens_do_pedido.pedido_id", "pedido.id")
            .select(
                "produto.nome as nomeProduto",
                "itens_do_pedido.subtotal as valor",
                "itens_do_pedido.quantidade as quantidade"
            ).where("itens_do_pedido.pedido_id", pedido.idPedido);

            pedido.itensPedido = itensDoPedido;
        }
        
        return res.status(200).json(pedidos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarPedidos
}