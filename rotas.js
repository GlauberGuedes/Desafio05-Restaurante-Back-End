const express = require('express');
const rotas = express();
const usuario = require('./controladores/usuarios');
const login = require('./controladores/login');
const categorias = require('./controladores/categorias');
const verificarToken = require('./filtros/verificarToken');

rotas.post('/usuarios', usuario.cadastrarUsuario);
rotas.post('/login', login.loginUsuario);

rotas.get('/categorias', categorias.listaDeCategoria);

rotas.use(verificarToken);

module.exports = rotas;