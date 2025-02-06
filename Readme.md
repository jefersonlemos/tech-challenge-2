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

```bash
    node server.js
```

## Utilização

### Criar Postagem

```bash
    curl --location 'http://localhost:3000/posts' \
    --header 'Content-Type: application/json' \
    --data '{
        "author": "José Silva",
        "title": "Dica de Matemática",
        "content": "Conteúdo da Dica de Matemática"
    }'
```

### Listar Postagens

```bash
    curl --location 'http://localhost:3000/posts'
```
