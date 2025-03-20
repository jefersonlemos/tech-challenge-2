## Tech Challenge Fase 2

Integrantes do Grupo 6:

 - Alexandre Baaklini Gomes Coelho
	abaaklini@gmail.com
- Eveline Carla Arruda Falcão
	falcao.eveline@gmail.com
- Felipe Galobart Jora
	felipe@mitsuwa.com.br
- Victor Hugo Salomão Padrão
	victor_hugo287@hotmail.com
- Jeferson Lemos dos Santos
	jefersonlemosdossantos@gmail.com

   
# Sumário

[Sumário](#sumário)
- [Introdução](#introdução)
- [Instruções](#instruções)
    - [Pré-requisitos](#pré-requisitos)
    - [Execução da aplicação](#execução-da-aplicação)
    - [Configuração para Desenvolvimento Local](#configuração-para-desenvolvimento-local)
        - [Utilizando o docker-compose](#utilizando-o-docker-compose)
        - [Executando Fora do Container](#executando-fora-do-container)
- [Uso Básico](#uso-básico)
- [Especificações do Projeto](#especificações-do-projeto)
    - [Tecnologias Utilizadas](#tecnologias-utilizadas)
    - [Ferramentas de Gerenciamento](#ferramentas-de-gerenciamento)
    - [Estratégia de Controle de Versão](#estratégia-de-controle-de-versão)
- [Arquitetura do sistema](#arquitetura-do-sistema)
    - [Padrão MVC](#padrão-mvc)
    - [Descrição das Pastas](#descrição-das-pastas)
- [API REST](#api-rest)
    - [Endpoints](#endpoints)
- [Modelos de Dados](#modelos-de-dados)
    - [Estrutura do Esquema](#estrutura-do-esquema)
    - [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
    - [Exemplo de Documento](#exemplo-de-documento)

- [Docker e Conteinerização](#docker-e-conteinerização)
- [CI/CD Pipeline](#cicd-pipeline)
- [Testes](#testes)
    - [Testes Unitários](#testes-unitários)
    - [Métricas de Cobertura](#métricas-de-cobertura)
- [Desafios e Soluções](#desafios-e-soluções)
- [Apêndices](#apêndices)

##

# Introdução

O sistema visa criar uma camada de serviços para gerenciar um sistema de blog, permitindo a criação, leitura, atualização e exclusão (CRUD) de postagens através de rotas HTTP. A API segue os princípios REST, utilizando os métodos HTTP apropriados para cada operação e retornando respostas em formato JSON com os códigos de status adequados. A integração com MongoDB proporciona flexibilidade para armazenamento de conteúdo em diferentes formatos, além de escalabilidade para suportar o crescimento da base de dados.

# Instruções

[Repositório do Projeto no GitHub](https://github.com/jefersonlemos/tech-challenge-2)

## Pré-requisitos

 1.  Conexão com a internet
 2. Sistema Operacional Linux ou compatíveis ou Windows com WSL
    
3.  Node 20 ou superior instalado em sua máquina
    
4.  Docker e Docker Compose instalados
    
5.  Imagem da aplicação
    
6.  Variáveis de ambiente
    
## Execução da aplicação
1. Clone o repositório
```bash
git clone https://github.com/jefersonlemos/tech-challenge-2.git
cd tech-challenge-2
```

2.  Configure as variáveis de ambiente

Use `mongodb` como MONGO_HOST porque os serviços estão na mesma rede interna do Docker Compose.
```bash
export MONGO_INITDB_ROOT_USERNAME=<usuario>  
export MONGO_INITDB_ROOT_PASSWORD=<senha>
export MONGO_HOST=mongodb  
export MONGO_PORT=27017  
export MONGO_USER=<usuario>  
export MONGO_PASS=<senha>
```

3. Execute o docker-compose
```bash
docker-compose up -d
```

A aplicação estará acessível em http://localhost:3000 e a documentação técnica do Swagger estará disponível em: http://localhost:3000/api-docs.


## Configuração para Desenvolvimento Local

### Utilizando o docker-compose

1.  Clone o repositório
    
```bash
git clone https://github.com/jefersonlemos/tech-challenge-2.git  
cd tech-challenge-2
```
2.  Instale as dependências
```bash
npm install
```

3.  Faça o build da aplicação
```bash    
npm run build
```
4.  Build da imagem Docker
```bash
docker build -t techchallenge-dev .
```
5.  Ajuste o docker-compose para utilizar a imagem local correta
```yaml    
services:
    app:
        image: techchallenge-dev
        container_name: app-blog-escola-publica-dev
```
  
6.  Configure as variáveis de ambiente

Use `mongodb` como MONGO_HOST porque os serviços estão na mesma rede interna do Docker Compose.
```bash
export MONGO_INITDB_ROOT_USERNAME=<usuario>  
export MONGO_INITDB_ROOT_PASSWORD=<senha>
export MONGO_HOST=mongodb  
export MONGO_PORT=27017  
export MONGO_USER=<usuario>  
export MONGO_PASS=<senha>
```
7.  Inicie a aplicação com Docker Compose
```bash
docker-compose up -d
```
A aplicação estará acessível em [http://localhost:3000](http://localhost:3000) e a documentação técnica do Swagger estará disponível em: http://localhost:3000/api-docs.

### Executando Fora do Container

1.  Clone o repositório
```bash    
git clone https://github.com/jefersonlemos/tech-challenge-2.git  
cd tech-challenge-2
```
2.  Instale as dependências (se ainda não tiver feito)
```bash    
npm install
```
3.  Configure as variáveis de ambiente como dito anteriormente, apenas orientamos que use localhost como MONGO_HOST porque a aplicação está rodando no host e precisa se conectar ao MongoDB através da interface de rede do host.
```bash
export MONGO_INITDB_ROOT_USERNAME=<user>
export MONGO_INITDB_ROOT_PASSWORD=<pass>
export MONGO_HOST=localhost
export MONGO_PORT=27017
export MONGO_USER=<user>
export MONGO_PASS=<pass>
```
4.  Faça o build da aplicação
```bash
npm run build
```
5.  Inicie o servidor
```bash
npm run start
```

Nesse modo de execução é necessário que somente o container do MongoDB esteja executando.

## Uso Básico

Criar uma Postagem
```bash
curl --location 'http://localhost:3000/posts' \  
--header 'Content-Type: application/json' \  
--data '{  
"autor": "José Silva",  
"titulo": "Dica de Matemática",  
"conteudo": "Conteúdo da Dica de Matemática"  
}'
```

Listar Postagens
```bash
curl --location 'http://localhost:3000/posts'
```

⚠ ️ AVISO: Quando você configurar a aplicação pela primeira vez, o banco de dados estará vazio. Você precisará criar a primeira postagem usando o endpoint de API descrito acima. O banco de dados MongoDB é configurado através do Docker Compose e manterá os dados entre os reinicios do container.

# Especificações do Projeto

## Tecnologias Utilizadas

- TypeScript: Linguagem de programação que adiciona tipagem estática ao JavaScript
- ESLint: Ferramenta de análise de código para identificar e corrigir problemas
- Node.js: Ambiente de execução JavaScript server-side
- Express: Framework web para Node.js que simplifica o desenvolvimento de APIs
- MongoDB: Banco de dados NoSQL orientado a documentos
- Swagger: Ferramenta para documentação de APIs REST
- Docker: Plataforma de conteinerização para facilitar a implantação
- Jest: Framework de testes para JavaScript
- Postman: Plataforma para teste e documentação de APIs
- GitHub: Plataforma de hospedagem de código-fonte com controle de versão
- GitHub Actions: Ferramenta de automação e CI/CD integrada ao GitHub

## Ferramentas de Gerenciamento

- GitHub Projects: Para gerenciamento de tarefas
- Notion: Para documentação e centralização de informações
- Google Meets: Para reuniões
- WhatsApp: Para comunicação rápida entre membros da equipe
- Dropbox: Para compartilhamento de arquivos e gravações

## Estratégia de Controle de Versão

O projeto utiliza GitHub Flow como estratégia de controle de versão. Este modelo propõe uma abordagem simplificada baseada em branches curtas para cada funcionalidade ou correção. Quando prontas, as alterações são submetidas a pull requests para revisão e, após aprovação, integradas diretamente ao branch principal. Esta estratégia favorece ciclos de desenvolvimento mais rápidos, integração contínua e implantações frequentes, sendo ideal para equipes que buscam agilidade e fluxo de trabalho direto.

## Arquitetura do Sistema

### Padrão MVC

A arquitetura do sistema é baseada no padrão Model-View-Controller (MVC), que separa a aplicação em três componentes principais que interagem entre si. Esta abordagem promove a modularidade do código, facilita a manutenção e possibilita que cada componente do sistema evolua de forma independente dos demais. No nosso projeto o Model, representado pela pasta src/models, gerencia os dados e regras de negócio. O Controller, representado pela pasta  src/controllers, processa as solicitações e coordena as respostas, enquanto a View é representada pelos endpoints da API que fornecem os dados em formato JSON.

A pasta src/routes atua como um complemento ao padrão MVC, definindo os endpoints da API e direcionando as requisições para os controladores corretos, funcionando como uma camada intermediária entre as requisições do cliente e os controladores.

### Descrição das Pastas
```
├── .github/
│ └── workflows/ # Arquivos de configuração para CI/CD no GitHub Actions
│
├── src/ # Código-fonte da aplicação
│ ├── config/ # Configurações da conexão com o banco de dados
│ ├── controllers/ # Controladores das requisições e respostas
│ ├── models/ # Modelos de esquemas do MongoDB e a lógica de negócios
│ ├── routes/ # Definição de rotas e endpoints da API
│ ├── app.ts # Configuração e inicialização da aplicação Express
│ ├── server.ts # Inicialização do servidor HTTP e conexão com o banco
│ └── swagger.ts # Configuração da documentação Swagger para a API
│
└── test/ # Testes da aplicação
├── controllers/ # Testes para os controladores
├── models/ # Testes para os modelos
├── routes/ # Testes para as rotas
└── swagger.test.ts # Testes para a configuração do Swagger
```

# API REST

## Endpoints

- /posts
    - **Método:** GET
        - **Descrição:** Lista todos os posts.
    - **Método:** POST
        - **Descrição:** Cadastra um novo post.

- /posts/search
    - **Método:** GET
    - **Descrição:** Lista posts por palavras-chave.
    - **Parâmetros de Consulta:** q (string) - Palavra-chave para busca.

- /posts/:id
    - **Método:** GET
        - **Descrição:** Lista um post por ID.
        - **Parâmetros de Rota:** id (ObjectId) - ID do post.
    - **Método:** PUT
        - **Descrição:** Atualiza um post existente.
        - **Parâmetros de Rota:** id (ObjectId) - ID do post.
    - **Método:** DELETE
        - **Descrição:** Exclui um post existente.
        - **Parâmetros de Rota:** id (ObjectId) - ID do post.

Exemplos detalhados de respostas de sucesso ou falha podem ser encontrados na documentação técnica da API (disponível em: http://localhost:3000/api-docs).

# Modelos de Dados

O modelo de dados é definido usando o Mongoose, uma biblioteca de modelagem de dados para MongoDB e Node.js. O esquema (postSchema.ts) define a estrutura dos documentos na coleção Post.

## Estrutura do Esquema

- **id:** Um identificador único para cada post, do tipo ObjectId do MongoDB.
- **titulo:** Um campo obrigatório (required: true) que armazena o título do post, do tipo String.
- **conteudo:** Um campo opcional que armazena o conteúdo do post, do tipo String.
- **autor:** Um campo opcional que armazena o autor do post, do tipo String.
- **timestamps:** Adiciona automaticamente os campos createdAt e updatedAt aos documentos, renomeados para criado_em e atualizado_em, respectivamente.
- **versionKey:** Desativado (false), o que significa que o campo __v (usado para controle de versão) não será adicionado aos documentos.

## Estrutura do Banco de Dados

No MongoDB, a estrutura do banco de dados é flexível e baseada em coleções e documentos. Para este modelo:

-   **Coleção:** Post
-   Cada documento na coleção Post representa um post individual.
-   Os documentos seguem a estrutura definida pelo postSchema.ts.

## Exemplo de Documento

Um documento na coleção Post pode ter a seguinte aparência:
```json
{  
"_id": "60d5f9b5e1d3c8b1c8d1e8b1",  
"titulo": "Meu Primeiro Post",  
"conteudo": "Este é o conteúdo do meu primeiro post.",  
"autor": "Autor Exemplo",  
"criado_em": "2023-10-01T12:34:56.789Z",  
"atualizado_em": "2023-10-01T12:34:56.789Z"  
}
```

# Docker e Conteinerização

O projeto utiliza Docker para conteinerização, com um Dockerfile que define a imagem do aplicativo Node.js. Ele usa node:22-slim como base, define /app como diretório de trabalho, copia dependências e o diretório dist, e expõe a porta 3000. O comando de inicialização é npm run start.

O docker-compose.yml configura dois serviços: app e mongodb. O serviço app usa a imagem jefoso/blog-escola-publica:latest, mapeia a porta 3000 e define variáveis de ambiente para o MongoDB. O serviço mongodb usa a imagem mongo:latest, mapeia a porta 27017 e monta um volume para persistência de dados.

Boas práticas incluem o uso de imagens leves, separação de dependências, persistência de dados com volumes e configuração via variáveis de ambiente. O workflow CI (workflow-ci.yaml) constroiconstrói e envia a imagem Docker para o Docker Hub, autenticando com credenciais seguras e marcando a imagem com latest ou o SHA do commit.

# CI/CD Pipeline

A pipeline de CI/CD, definida no arquivo workflow-ci.yaml, utiliza o GitHub Actions para automatizar o processo de integração contínua e entrega contínua (CI/CD) do nosso projeto:

1.  Cache de Dependências:
	-   Utiliza cache para armazenar dependências do npm, acelerando builds futuros.
	-   Verifica se o cache foi utilizado ou não.

2.  Instalação de Dependências:
	-   Instala as dependências do projeto usando  npm install.

3.  Execução de Testes:
	-   Executa os testes definidos no projeto com npm run test.

4.  Build da Aplicação:
	-   Compila a aplicação usando npm run build.

5.  Login no Docker Hub:
	-   Faz login no Docker Hub usando credenciais armazenadas em segredos do GitHub (DOCKER_USERNAME  e DOCKER_PASSWORD).

6.  Build e Push de Imagens Docker:
	-   Constrói a imagem Docker da aplicação.   
	-   Faz push da imagem para o Docker Hub.
	-   Marca a imagem com a tag latest  se o branch for main  e também com o SHA do commit.
    

Este fluxo de trabalho garante que a aplicação seja testada, construída e implantada automaticamente em cada commit, mantendo a qualidade e a consistência do código.

# Testes

O projeto utiliza o MongoMemoryServer para criar um banco de dados MongoDB em memória durante os testes. Isso permite que os testes sejam executados de forma isolada e sem a necessidade de um banco de dados real, garantindo que os dados de teste não afetem o ambiente de produção.

## Testes Unitários

Os testes unitários são escritos usando jest  e supertest  para testar as rotas e controladores do aplicativo. Os testes estão organizados em diferentes arquivos para cobrir várias partes do sistema:

- **test/swagger.test.ts:** Testa a configuração do Swagger, garantindo que a documentação da API esteja acessível.
- **test/routes/postsRoutes.test.ts:** Testa as rotas de posts, incluindo operações de CRUD (Create, Read, Update, Delete) e busca por palavras-chave.
- **test/models/Post.test.ts:** Testa o modelo Post, verificando a criação e validação de documentos.
- **test/controllers/postController.test.ts:** Testa o controlador PostController, garantindo que as operações de CRUD funcionem corretamente.

## Métricas de Cobertura

Para obter métricas de cobertura, o projeto utiliza o comando npm run test:coverage. Isso gera um relatório detalhado que mostra a porcentagem de código coberto pelos testes:

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXc64jxhqpg1EMhB5SvDz6kyQpOCGrb-ukwr8gadtz_bbPFR3PYBPEO_hQxWKho41LLKRyTiB8MXUNMyoWRVRSDAxObQ2oohGvTqJmGs97bSTl0pkvcbkAaH1XHr-Sj5ugQyICojOA?key=7gWURWvUss-0fA0S_OdUQk6_)

-   **Statements (Declarações):** 84.93%. Refere-se ao número de declarações executáveis no código. A cobertura de statements indica a porcentagem dessas declarações que foram executadas durante os testes.  
-   **Branches (Ramificações):** 57.14%. Refere-se aos pontos de decisão no código, como instruções if, switch e operadores ternários. A cobertura de branches indica a porcentagem dessas ramificações que foram testadas, incluindo todas as possíveis condições.
-   **Functions (Funções):** 88.88%. Refere-se ao número de funções ou métodos definidos no código. A cobertura de functions indica a porcentagem dessas funções que foram chamadas durante os testes.
-   **Lines (Linhas):** 84.93%. Refere-se ao número de linhas de código executáveis. A cobertura de linhas indica a porcentagem dessas linhas que foram executadas durante os testes.

Essas métricas indicam uma boa cobertura geral, com áreas específicas que podem ser melhoradas, especialmente em termos de cobertura de branches.

# Desafios e Soluções

Ao longo do projeto enfrentamos desafios técnicos significativos, como quanto à estruturação do fluxo de trabalho e a definição de um versionamento eficiente, coisas que exigiram aprendizado contínuo e adaptações ao longo do projeto. Dividir o projeto em tarefas menores e entender o passo a passo do processo também foi um desafio, pois exigiu foco para manter o escopo bem definido e evitar a ambição de expandir o projeto para além do proposto na atividade. Entre os desafios técnicos, podemos citar o uso do TypeScript, pois exigiu aprendizado sobre tipagem estática com as mais diversas bibliotecas, enquanto o Docker exigiu um entendimento sobre a criação de containers, configuração do ambiente e uma nova abordagem ao realizar a integração com o banco de dados MongoDB.

Para superar essas dificuldades, adotamos um planejamento utilizando GitHub Projects e uma lista de tarefas no Notion, o que nos ajudou a visualizar o progresso e distribuir responsabilidades de forma clara. No processo de CI/CD, o GitHub Actions foi um novo desafio, exigindo ajustes no uso do MongoDB para a realização com sucesso dos testes pela plataforma. Como lição principal, reforçamos a importância da comunicação eficiente, do planejamento estruturado e da flexibilidade para lidar com novos conceitos e ferramentas. O projeto nos deu uma base sólida para trabalhos futuros, destacando a necessidade de organização, versionamento bem definido e boas práticas de desenvolvimento.

# Apêndices

[Notion do Grupo](https://evefalcao.notion.site/Tech-Challenge-Fase-2-18b50daed6e280399345ee765b801614?pvs=4)