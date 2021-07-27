const express = require('express');
const rotas = express();
const usuario = require('./controladores/usuarios');

rotas.post('/usuarios', usuario.cadastrarUsuario);


module.exports = rotas;