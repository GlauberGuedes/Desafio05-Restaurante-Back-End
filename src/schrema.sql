CREATE DATABASE restaurante_cubos;

CREATE TABLE categoria (
	id serial NOT NULL PRIMARY KEY,
  	nome varchar(30) NOT NULL
);

INSERT INTO categoria (nome) 
VALUES 
('Diversos'), ('Lanches'), ('Carnes'), 
('Massas'), ('Pizzas'), ('Japonesa'), 
('Chinesa'), ('Mexicano'), ('Brasileira'), 
('Italiana'), ('Árabe'); 


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
  	taxa_entrega integer NOT NULL DEFAULT 0,
  	tempo_entrega_minutos integer NOT NULL DEFAULT 30,
  	valor_minimo_pedido integer NOT NULL DEFAULT 0
);

CREATE TABLE produto (
	id serial NOT NULL PRIMARY KEY,
  	restaurante_id integer NOT NULL REFERENCES restaurante(id),
  	nome varchar(50) NOT NULL,
  	descricao varchar(100),
    foto text,
  	preco integer NOT NULL,
  	ativo boolean NOT NULL DEFAULT true,
  	permite_observacoes boolean NOT NULL DEFAULT false
);