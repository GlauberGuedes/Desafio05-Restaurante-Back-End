CREATE DATABASE restaurante_cubos;

CREATE TABLE categoria (
	id serial NOT NULL PRIMARY KEY,
  	nome varchar(30) NOT NULL,
  	imagem text
);

CREATE TABLE usuario (
	id serial NOT NULL PRIMARY KEY,
  	nome varchar(100) NOT NULL,
  	email varchar(100) NOT NULL,
  	senha text NOT NULL
);

CREATE TABLE restaurante (
	id serial NOT NULL PRIMARY KEY,
  	usuario_id integer NOT NULL REFERENCES usuario(id),
  	nome varchar(50) NOT NULL,
  	descricao varchar(100),
  	categoria_id integer NOT NULL REFERENCES categoria(id),
  	imagem text,
  	taxa_entrega integer NOT NULL DEFAULT 0,
  	tempo_entrega_minutos integer NOT NULL DEFAULT 30,
  	valor_minimo_pedido integer NOT NULL DEFAULT 0
);

CREATE TABLE produto (
	id serial NOT NULL PRIMARY KEY,
  	restaurante_id integer NOT NULL REFERENCES restaurante(id),
  	nome varchar(50) NOT NULL,
  	descricao varchar(100),
    imagem text,
  	preco integer NOT NULL,
  	ativo boolean NOT NULL DEFAULT true,
  	permite_observacoes boolean NOT NULL DEFAULT false
);

INSERT INTO categoria (nome, imagem)
VALUES
('Diversos', 'https://s2.best-wallpaper.net/wallpaper/2560x1600/1908/Many-kinds-of-food-meat-tomatoes-pie_2560x1600.jpg'),
('Lanches', 'https://images.pexels.com/photos/4109139/pexels-photo-4109139.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
('Carnes', 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
('Massas', 'https://images.pexels.com/photos/5507643/pexels-photo-5507643.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'),
('Pizzas', 'https://www.verangola.net/va/images/cms-image-000012618.jpg'),
('Japonesa', 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
('Chinesa', 'https://images.pexels.com/photos/9031956/pexels-photo-9031956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
('Mexicano', 'https://images.pexels.com/photos/8448320/pexels-photo-8448320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
('Brasileira', 'https://jeffersondealmeida.com.br/wp-content/uploads/2015/06/feijoada.jpeg'),
('Italiana', 'https://blog.duogourmet.com.br/wp-content/uploads/2019/12/Culin%C3%A1ria-italiana-no-Brasil-scaled.jpg'),
('Árabe', 'https://revistadeguste.com/wp-content/uploads/2021/01/SALAMALEICOJAN21_1.jpg');