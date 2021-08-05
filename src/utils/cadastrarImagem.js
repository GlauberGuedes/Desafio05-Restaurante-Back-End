const supabase = require("../supabase");

async function cadastrarImagem( nomeDaImagem, buffer ) {
  try{
    const { error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(nomeDaImagem, buffer);

      if (error) {
        return {erro: "Imagem não foi atualizada."};
      }

      const { publicURL, error: errorPublicURL } = supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .getPublicUrl(nomeDaImagem);

      if (errorPublicURL) {
        return {erro: "Erro ao gerar url da imagem."};
      }

      return {url: publicURL};
  }catch(error) {
    throw error;
  }
}

module.exports = cadastrarImagem;