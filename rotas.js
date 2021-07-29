const express = require('express');
const rotas = express();
const usuario = require('./controladores/usuarios');
const login = require('./controladores/login');
const categorias = require('./controladores/categorias');
const produtos = require('./controladores/produtos');
const verificarToken = require('./filtros/verificarToken');

rotas.post('/usuarios', usuario.cadastrarUsuario);
rotas.post('/login', login.loginUsuario);

rotas.get('/categorias', categorias.listaDeCategoria);

rotas.use(verificarToken);

rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.excluirProduto);

module.exports = rotas;