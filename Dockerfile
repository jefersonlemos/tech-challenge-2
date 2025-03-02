FROM node:22-slim

RUN mkdir /app
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./
COPY ./dist /app/dist

# Copy node_modules from the host machine
COPY node_modules /app/node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]

