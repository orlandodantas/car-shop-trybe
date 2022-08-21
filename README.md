<h1>Car Shop [Trybe]</h1> 

<p align="center">
  <img src="http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge"/>
</p>

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Pré-requisitos](#pré-requisitos)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

:small_blue_diamond: [Como rodar os teste](#como-rodar-os-testes)

:small_blue_diamond: [Dependências e Libs](#linguagens-dependencias-e-libs-utilizadas-books)

:small_blue_diamond: [Licença](#licença)


## Descrição do projeto 

<p align="justify">
  Este é um projeto proposto pela Trybe para desenvolvermos uma API com <b>CRUD</b> em <b>MongoDB</b> aplicando os princípios do <b>POO</b> e <b>SOLID</b>.
  O intuito da API é gerenciar uma concessionária de veículos.
</p>
<p>Foi possível aplicar os conceitos de herança, generics, polimorfismo, interfaces, e etc.</p>
<p>O maior desafio enfrentado neste projeto foi configurar o mongoose, mas que foi uma experiência maravilhosa, pois pude conhecer melhor sobre o mongoDB/mongose e aplicar vários conceitos da programação orientada a objetos e solid.</p>

## Funcionalidades

:heavy_check_mark: Cadastro de carros.  

:heavy_check_mark: Buscar todos os carros.

:heavy_check_mark: Buscar carro por ID.  

:heavy_check_mark: Buscar carros por modelo.

:heavy_check_mark: Atualizar carro.

:heavy_check_mark: Deletar Carro.


:heavy_check_mark: Cadastro de motocicleta.  

:heavy_check_mark: Buscar todas as motocicletas.

:heavy_check_mark: Buscar motocicleta por ID.  

:heavy_check_mark: Buscar motocicletas por modelo.

:heavy_check_mark: Atualizar motocicleta.

:heavy_check_mark: Deletar motocicleta.


## Pré-requisitos

:warning: [Node](https://nodejs.org/en/download/)
:warning: [Git](https://git-scm.com/downloads)
:warning: [MongoDB](https://www.mongodb.com/try/download/community)

## Como rodar a aplicação :arrow_forward:

#### No terminal:
Clone o projeto: 

```
git clone https://github.com/orlandodantas/car-shop-trybe.git
```
Entre na pasta do projeto: 

```
cd car-shop-trybe
```

Instale as dependências: 

```sh
npm install
```
Renomei o arquivo .env.exemple para .env:
> Unix
```sh
mv .env.exemple .env
```
> Windows
```sh
rename .env.exemple .env
```
Caso a porta do mongoDB instalado no seu PC esteja diferente da porta padrão você pode:
> Abrir o arquivo que acabou de renomear em um Editor/IDE de sua preferência por exemplo [VsCode](https://code.visualstudio.com/):
> e modificar a porta 27017 pela porta configurada no momento da instalação do mongo.

Rodar a aplicação:

```sh
npm run dev
```

> Agora a aplicação está pronta para ser usada em um cliente rest por exemplo o [Insomnia](https://insomnia.rest/download).


## Como rodar os testes

#### Em um terminal:
Rodar a execução dos testes:

```sh
npm run test:dev
```

Rodar a execução do teste coverage:

```sh
npm run test:coverage
```

## Linguagens, dependências e libs utilizadas :books:

- [Node](https://nodejs.org/en/download/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Express Async Errors](https://www.npmjs.com/package/express-async-errors)
- [Joi](https://www.npmjs.com/package/joi)
- [Zod](https://www.npmjs.com/package/zod)
- [Mongoose](https://www.npmjs.com/package/mongoose)

## Licença 

The [MIT License]() (MIT)

Copyright :copyright: 2022 - ToDo List API
