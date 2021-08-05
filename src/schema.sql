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
('Diversos', 'https://blog.goomer.com.br/wp-content/uploads/2020/11/goomer-pratos-do-dia-cardapio-restaurante-como-montar-780x450.jpg'),
('Lanches', 'https://images.pexels.com/photos/4109139/pexels-photo-4109139.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
('Carnes', 'https://blog.santamassa.com.br/wp-content/uploads/2018/10/247730-top-8-melhores-tipos-de-carne-para-churrasco-1280x720.jpg'),
('Massas', 'https://st3.depositphotos.com/8005734/37747/i/1600/depositphotos_377471546-stock-photo-table-italian-meals-plates-pizza.jpg'),
('Pizzas', 'https://www.verangola.net/va/images/cms-image-000012618.jpg'),
('Japonesa', 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
('Chinesa', 'https://media.istockphoto.com/photos/chinese-food-blank-background-picture-id545455948?k=6&m=545455948&s=612x612&w=0&h=mtkFa4qU1yLPJF7LA0kr5mSNXOxyy468GfMD42SONEI='),
('Mexicano', 'https://meubistro.com/blog/wp-content/uploads/2019/07/comida-mexicana.jpg'),
('Brasileira', 'https://jeffersondealmeida.com.br/wp-content/uploads/2015/06/feijoada.jpeg'),
('Italiana', 'https://viagemegastronomia.cnnbrasil.com.br/wp-content/uploads/sites/5/2021/03/delivery-comida-italiana.jpg?w=800'),
('Árabe', 'https://cursosemgeral.com.br/uploads/_thumb/cedoc_doc_16243/img16243_i032vhsv9gddmjiafqvwxcqoyeqe87eiwxn5e0os3rn7o40620sj5b9zxfrclfkiif87hbiuuj3l0l74734jygdh7h9rpj420l4a.jpg');