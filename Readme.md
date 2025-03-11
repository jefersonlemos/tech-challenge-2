# Tech Challenge Fase 2

## Grupo

    - Alexandre Baaklini Gomes Coelho
    - Eveline Carla Arruda Falcão
    - Felipe Galobart Jora
    - Jeferson Lemos dos Santos
    - Victor Hugo Salomão Padrão

## Instalação

```bash
    git clone git@github.com:jefersonlemos/tech-challenge-2.git
```

```bash
    cd tech-challenge-2/
```

```bash
    npm install
```
## Carregando o banco de dados
```bash
    docker compose up
```

## Editando o arquivo .env
```bash
    echo -e 'PORT=3000\nMONGODB_URI=mongodb://admin:admin@localhost:27017/' >> .env
```

## Buildando o servidor
```bash
    npm run build
```

## Iniciando o servidor
```bash
    npm run start
```

## Utilização

### Criar Postagem

```bash
    curl --location 'http://localhost:3000/posts' \
    --header 'Content-Type: application/json' \
    --data '{
        "autor": "José Silva",
        "titulo": "Dica de Matemática",
        "conteudo": "Conteúdo da Dica de Matemática"
    }'
```

### Listar Postagens

```bash
    curl --location 'http://localhost:3000/posts'
```

## Documentação da API

http://localhost:3000/api-docs
