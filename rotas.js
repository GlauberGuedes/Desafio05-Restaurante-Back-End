const express = require('express');
const rotas = express();
const usuario = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificarToken = require('./filtros/verificarToken');

rotas.post('/usuarios', usuario.cadastrarUsuario);
rotas.post('/login', login.loginUsuario);

rotas.use(verificarToken);

module.exports = rotas;