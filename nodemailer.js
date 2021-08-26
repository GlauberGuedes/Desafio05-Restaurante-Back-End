const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

const transportador = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  }
});

transportador.use('compile', handlebars({
  viewEngine: {
    extname: '.handlebars',
    defaultLayout: false,
  },
  viewPath: './views/'
}));

module.exports = transportador;