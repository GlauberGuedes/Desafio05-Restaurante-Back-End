# Desafio05-Restaurante-Back-end

API para um serviço de delivery de comidas, responsável pela parte de cadastro, atualizção do restaurante e de seus produtos.

- Todos os objetos enviados pelo body da requisição deverá ser um JSON.

## Como iniciar o projeto:

- Clonar o repositório
- "npm i" para instalar as dependências
- criar um banco de dados com as informações do arquivo schrema.sql (dentro da pasta src)
- colocar as informações do banco e do serviço de upload de imagem em um arquivo .env (senguindo o exemplo do arquivo .env.exemplo
- "npm run dev" para rodar o projeto

## Endpoints:

### `GET` `/categorias`

Lista todas as categorias de restaurantes e suas imagens.

### `POST` `/usuarios`

Recebe todas as informações de cadastro do usuário e do restaurante, verificará se já existe um cadastro com esse email ou um restaurante com o mesmo nome e se os campos enviados estão corretos, caso esteja tudo correto, irá criptografar a senha enviada e salvar o usuário e restaurante no banco de dados.

Exemplo de como enviar os dados para o cadastro:

```{
  "nome": "Nome Do Usuário",
  "email": "email.do.usuario@provedor.com",
  "senha": "abc123",
  "restaurante": {
    "nome": "Nome do Restaurante",
    "descricao": "Uma breve descrição do restaurante.",
    "idCategoria": 3,
    "taxaEntrega": 1000,
    "tempoEntregaEmMinutos": 30,
    "valorMinimoPedido": 1500
  }
}```

function sayHello() {
      return 'hi!';
    }

### `PUT` `/usuarios`

Recebe todas as informações do usuário e do restaurante, além da imagem do perfil do restaurante, verificará se já existe um cadastro com esse email ou um restaurante com o mesmo nome e se os campos enviados estão corretos, caso esteja tudo correto, irá atualizar o usuário e o restaurante.

- A imagem deve ser enviada no formato de base64
- O campo imagem e senha não são obrigatórios
- Nesse endpoint tem que ser enviado um token de autenticação no header, no formato de Bearer token.

Exemplo de como enviar os dados para a atualização de cadastro:

``{
  "nome": "Nome Do Usuário",
  "email": "email.do.usuario@provedor.com",
  "senha": "abc123",
  "restaurante": {
    "nome": "Nome do Restaurante",
    "descricao": "Uma breve descrição do restaurante.",
    "idCategoria": 3,
    "taxaEntrega": 1000,
    "tempoEntregaEmMinutos": 30,
    "valorMinimoPedido": 1500,
    "imagem": "imagem em base64"
  }
}``

### `POST` `/login`

Recebe as informações de login (email e senha), verificará se o email existe na tabela de usuários do banco de dados e se a senha confere com a senha cadastrada, caso esteja tudo correto, irá criar um token e enviar ele na resposta.

Exemplo de como enviar os dados para o login:

``{
  "email": "dono.do@restaurante.com",
  "senha": "scadulfax"
}``

### `GET` `/produtos`

Lista todos os produtos do restaurante.

- Nesse endpoint tem que ser enviado um token de autenticação no header, no formato de Bearer token.

### `GET` `/produtos/:id`

Retorna o produto com o id informado.

- Nesse endpoint tem que ser enviado um token de autenticação no header, no formato de Bearer token.

### `POST` `/produtos`

Endpoint para cadastrar um novo produto. Recebe as informações do produto, valida se estão corretas e salva no banco de dados.

Exemplo de como enviar os dados para o cadastro de produto:

``{
  "nome": "Pizza de frango com catupiry",
  "descricao": "Pizza tamanho grande, 8 pedaços",
  "preco": 7000,
  "permiteObservacoes": false
}``
