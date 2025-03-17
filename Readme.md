# Tech Challenge Fase 2

## Grupo

    - Alexandre Baaklini Gomes Coelho
    - Eveline Carla Arruda Falcão
    - Felipe Galobart Jora
    - Jeferson Lemos dos Santos
    - Victor Hugo Salomão Padrão

## Execução do app em tempo de desenvolvimento
Para usar o ambiente localmente é necessário que existam em seu computar, a imagem do banco de dados e da aplicação e as variáveis de ambiente.

Vamos aos passos:
1. Instalação das dependências

```bash
npm install
``` 

2. Build da aplicação

```bash
npm run build
```

3. Build da imagem

```bash
docker build -t techchallenge .
```

4. Export das variáveis de ambiente

:warning: Aqui é necessário ajustar os dados de conexao e tomar muito cuidado para nao commitar no repositório.

```bash
export MONGO_INITDB_ROOT_USERNAME=<user>
export MONGO_INITDB_ROOT_PASSWORD=<pass>
export MONGO_HOST=<mongodb>
export MONGO_PORT=27017
export MONGO_USER=<user>
export MONGO_PASS=<pass>
```

3. Execução local

```bash
docker-compose up -d
```

Aplicação acessível via http://localhost:3000

## Executando app fora do container

1. Instalação das dependências

```bash
npm install
``` 
2. Build da aplicação

```bash
npm run build
```
3. Start do servidor

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
