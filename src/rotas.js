const express = require('express');
const rotas = express();
const usuario = require('./controladores/usuarios');
const login = require('./controladores/login');
const categorias = require('./controladores/categorias');
const produtos = require('./controladores/produtos');
const pedidos = require('./controladores/pedidos');
const verificarToken = require('./filtros/verificarToken');

rotas.post('/usuarios', usuario.cadastrarUsuario);
rotas.post('/login', login.loginUsuario);
rotas.post('/solicitar-alteracao', usuario.solicitarAlteracaoSenha);
rotas.post('/redefinir-senha', usuario.redefinirSenha);

rotas.get('/categorias', categorias.listaDeCategoria);

rotas.use(verificarToken);

rotas.put('/usuarios', usuario.atualizarUsuario);
rotas.get('/usuarios', usuario.obterUsuario);

rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.excluirProduto);
rotas.post('/produtos/:id/ativar', produtos.ativarProduto);
rotas.post('/produtos/:id/desativar', produtos.desativarProduto);
rotas.get('/pedidos', pedidos.listarPedidos);
rotas.post('/entregas/:id/ativar', pedidos.ativarSaidaParaEntrega);
rotas.post('/entregas/:id/desativar', pedidos.desativarSaidaParaEntrega); 

module.exports = rotas;