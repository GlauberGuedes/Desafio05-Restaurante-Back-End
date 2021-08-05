function obterNomeDaImagem(urlImagem) {
  const nomeDaImagem = urlImagem.replace(
    `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/`,
    ""
  );
  return nomeDaImagem;
}

module.exports = obterNomeDaImagem;