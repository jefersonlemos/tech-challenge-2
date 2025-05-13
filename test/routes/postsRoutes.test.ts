import { beforeEach, afterEach, describe, expect, it, jest } from "@jest/globals";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import routes from "../../src/routes/index";
import Post from "../../src/models/Post";

let mongoServer: MongoMemoryServer;
const app = express();
routes(app);

let token: string;
let idResposta: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Cria usuário de teste e obtém token JWT
  await request(app)
    .post("/register")
    .send({ email: "test@example.com", password: "senha123" });

  const loginRes = await request(app)
    .post("/login")
    .send({ email: "test@example.com", password: "senha123" });

  token = loginRes.body.token;
});

afterAll(async () => {
  await Post.deleteMany();
  await mongoose.disconnect();
  await mongoServer.stop();
});

// beforeEach(async () => {
// });

// import app from "../../src/app";
// import { Server } from "http";

// let server: Server | undefined;
// beforeEach(() => {
//   const port = process.env.PORT || 3000;
//   server = app.listen(port);
// });

// afterEach(() => {
//   server?.close();
// });

describe("GET em /posts", () => {
  it("Deve retornar 200 ou uma lista de posts", async () => {
    const resposta = await request(app)
      .get("/posts")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    // expect(resposta.body[0].titulo).toEqual("Tudo Sobre Teoria dos Conjuntos");
  });
});

describe("POST em /posts", () => {
  it("Deve adicionar um novo post", async () => {
    const resposta = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Teste",
        conteudo: "Conteudo do post de teste",
        autor: "Prof. Teste",
      })
      .expect(201);

    // console.log(resposta.body);

    expect(resposta.body).toHaveProperty("post._id");

    idResposta = resposta.body.post._id;
  });

  it("Deve não adicionar nada ao passar o body vazio", async () => {
    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(500);
  });
});

describe("GET em /posts/id", () => {
  it("Deve retormar o post de teste", async () => {
    await request(app)
      .get(`/posts/${idResposta}`)
      .expect(200);
  });
});

describe("PUT em /posts/id", () => {
  test.each([
    ["titulo", { titulo: "Titulo do Post de Teste Editado" }],
    ["conteudo", { conteudo: "Conteudo do Post de Teste Editado" }],
    ["autor", { autor: "Prof. Teste Editado" }],
  ])("Deve alterar o campo %s", async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, "request");
    await requisicao.request(app)
      .put(`/posts/${idResposta}`)
      .set("Authorization", `Bearer ${token}`)
      .send(param)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });
});

describe("GET em /posts/search", () => {
  it("Deve retornar posts que correspondem à palavra-chave", async () => {
    const resposta = await request(app)
      .get("/posts/search?q=Teste")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(resposta.body).toBeInstanceOf(Array);
    expect(resposta.body.length).toBeGreaterThan(0);
    expect(resposta.body[0]).toHaveProperty("titulo", "Titulo do Post de Teste Editado");

    // console.log(resposta.body);
  });
});

describe("DELETE em /posts/id", () => {
  it("Deletar o post adicionado", async () => {
    await request(app)
      .delete(`/posts/${idResposta}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
