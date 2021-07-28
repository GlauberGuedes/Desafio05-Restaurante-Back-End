const express = require('express');
const rotas = express();
const usuario = require('./controladores/usuarios');
const login = require('./controladores/login');
const produtos = require('./controladores/produtos');
const verificarToken = require('./filtros/verificarToken');

rotas.post('/usuarios', usuario.cadastrarUsuario);
rotas.post('/login', login.loginUsuario);

rotas.get('/categorias', produtos.listaDeCategoria);

rotas.use(verificarToken);

module.exports = rotas;