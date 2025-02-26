# Usa a imagem oficial do MongoDB
FROM mongo:latest

# Define o diretório de trabalho
WORKDIR /data/db

# Expondo a porta padrão do MongoDB
EXPOSE 27017

# Comando padrão ao iniciar o container
CMD ["mongod"]
