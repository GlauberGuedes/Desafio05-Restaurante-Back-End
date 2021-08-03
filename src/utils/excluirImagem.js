const supabase = require("../supabase");

async function excluirImagem(id) {
  const { error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET)
    .remove([`usuario${id}/avatar`]);

    if(error) {
      return 'Erro ao excluir imagem.'
    }
}

module.exports = excluirImagem;
