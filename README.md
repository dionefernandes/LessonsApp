# LessonsApp

LessonsApp é uma aplicação Node.js para gerenciamento de aulas. A aplicação possui endpoints para criação, atualização, exclusão e listagem de aulas.

A aplicação utiliza autenticação via token JWT e permite que o usuário acesse os endpoints apenas com o token válido.


## Instalação

Antes de tudo, é necessário ter o Node.js instalado na sua máquina. Para instalar o Node.js, siga as instruções disponíveis no site oficial: [REQRES](https://nodejs.org/)

Para instalar a aplicação LessonsApp, siga os seguintes passos:

1. Clone este repositório para sua máquina:
1. git clone [REQRES](https://github.com/dionefernandes/LessonsApp.git)
2. Abra o terminal e acesse a raiz da aplicação.
3. Instale as dependências necessárias executando o seguinte comando:
1. npm install
4. Inicie a aplicação executando o seguinte comando:
1. npm start


## Armazenamento de dados

Os dados da aplicação são armazenados em 'data/db.json', a partir da raiz do projeto. O arquivo JSON é usado para mockar as informações.


## Endpoints

A seguir estão listados os endpoints disponíveis na aplicação e suas respectivas funcionalidades. Para efeito de exemplo, iremos assumir que a aplicação será executada na porta 3000, pois esta é porta padrão na aplicação.

Caso queira, você poderá alterar a porta onde a aplicação será executada em 'src/app.js', a partir da raiz do projeto.

### http://localhost:3000/lessons/auth

Faz a autenticação e gera o token JWT. É necessário enviar o seguinte objeto JSON no corpo da requisição:

  {
      "username": "admin",
      "password": "admin123"
  }

O token JWT é retornado no Body da resposta. Copie o token.

Pressupondo que esteja utilizano o Postman para fazer as requisições das rotas, em cada uma das requisições você deverá:

1. Clique sobre a requisição e navegue até a aba 'Authorization';
2. Em 'Type', selecione 'Bearer Token';
3. Em 'Token' cole o token gerado


### @Get(http://localhost:3000/lessons/)

Retorna uma lista com todas as aulas cadastradas.


### @Get(http://localhost:3000/lessons/1)

Retorna a aula com o id especificado. No exemplo, retorna a aula com o id '1'.

### @Post(http://localhost:3000/lessons/)

Este endpoint é utilizado para cadastrar uma nova aula. Para que esta requisição funcione corretamente, você deve:

1. Clique sobre a requisição e navegue até a aba 'Body';
2. Logo abaixo de 'Body', selecione a opção 'raw'
3. Em seguida, selecione a opção 'JSON' na mesma linha de 'raw'
4. Na campo centrarl, no corpo da requisição, insira um objeto JSON como este do exemplo:
  {
    "title": "Introduction to Node.js",
    "description": "Learn the basics of Node.js",
    "duration": 50,
    "Teacher": "Manoel da Silva Nogueira",
    "ImgLink": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sgstechnologies.net%2Fblog%2Fintroduction-nodejs&psig=AOvVaw3wwu36ogr6uEHxjnyX5aYG&ust=1679850831555000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNih1ZPK9_0CFQAAAAAdAAAAABAE"
  }

### @Put(http://localhost:3000/lessons/1)

Este endpoint é utilizado para atualizar uma nova aula. Para que esta requisição funcione corretamente, você deve:

1. Clique sobre a requisição e navegue até a aba 'Body';
2. Logo abaixo de 'Body', selecione a opção 'raw'
3. Em seguida, selecione a opção 'JSON' na mesma linha de 'raw'
4. Na campo centrarl, no corpo da requisição, insira um objeto JSON como este do exemplo:
  {
    "title": "Introduction to Node.js",
    "description": "Learn the basics of Node.js",
    "duration": 50,
    "Teacher": "Manoel da Silva Nogueira",
    "ImgLink": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sgstechnologies.net%2Fblog%2Fintroduction-nodejs&psig=AOvVaw3wwu36ogr6uEHxjnyX5aYG&ust=1679850831555000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNih1ZPK9_0CFQAAAAAdAAAAABAE"
  }

Neste exemplo, a aula com id '1' será atualizada.

### @Delete(http://localhost:3000/lessons/1)

Este endpoint é utilizado para excluir uma aula. No caso deste exemplo, a aula com id '1' será execluída.


## Recursos

Para facilitar a utilização, você encontrará na raiz do projeto o arquivo 'LessonsApp.postman_collection.json'.

Este arquivo pode ser importado no Postman para auxiliar na configuração e utilização das rotas da aplicação LessonsApp.