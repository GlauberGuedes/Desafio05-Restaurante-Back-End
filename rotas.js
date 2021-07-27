const express = require('express');
const rotas = express();

const verificarToken = require('./filtros/verificarToken');

rotas.use(verificarToken);

module.exports = rotas;