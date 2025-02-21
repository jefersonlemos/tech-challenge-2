// filepath: /c:/Users/Eve/Documents/GITHUB/fiap/tech-challenge-2/src/controllers/__tests__/postController.test.ts
import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import PostController from "../../controllers/postController";
import Post from "../../models/Post";

const app = express();
app.use(express.json());

app.get("/posts", PostController.listarPosts);
app.get("/posts/search", PostController.listarPostsPorPalavrasChave);
app.get("/posts/:id", PostController.listarPostPorId);
app.post("/posts", PostController.cadastrarPost);
app.put("/posts/:id", PostController.atualizarPost);
app.delete("/posts/:id", PostController.excluirPost);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Post.deleteMany({});
});

describe("PostController - Testes de sucesso", () => {
  it("Deve listar todos os posts", async () => {
    const post = new Post({ titulo: "Post 1", conteudo: "Conteúdo 1", autor: "Autor 1" });
    await post.save();

    const resposta = await request(app).get("/posts").expect(200);
    expect(resposta.body.length).toBe(1);
    expect(resposta.body[0].titulo).toBe("Post 1");
  });

  it("Deve listar um post por ID", async () => {
    const post = new Post({ titulo: "Post 1", conteudo: "Conteúdo 1", autor: "Autor 1" });
    await post.save();

    const resposta = await request(app).get(`/posts/${post._id}`).expect(200);
    expect(resposta.body.titulo).toBe("Post 1");
  });

  it("Deve buscar posts por palavras-chave", async () => {
    const post = new Post({ titulo: "Post Teste 1", conteudo: "Conteúdo 1", autor: "Autor 1" });
    await post.save();

    const resposta = await request(app).get("/posts/search").expect(200);
    expect(resposta.body.length).toBe(1);
    expect(resposta.body[0].titulo).toBe("Post Teste 1");
  });

  it("Deve criar um novo post", async () => {
    const novoPost = { titulo: "Novo Post", conteudo: "Conteúdo do novo post", autor: "Novo Autor" };
    const resposta = await request(app).post("/posts").send(novoPost).expect(201);

    expect(resposta.body.post.titulo).toBe("Novo Post");
  });

  it("Deve atualizar um post", async () => {
    const post = new Post({ titulo: "Post 1", conteudo: "Conteúdo 1", autor: "Autor 1" });
    await post.save();

    const atualizadoPost = { titulo: "Post Atualizado", conteudo: "Conteúdo Atualizado", autor: "Autor Atualizado" };
    await request(app).put(`/posts/${post._id}`).send(atualizadoPost).expect(204);

    const resposta = await Post.findById(post._id);
    expect(resposta?.titulo).toBe("Post Atualizado");
  });

  it("Deve excluir um post", async () => {
    const post = new Post({ titulo: "Post 1", conteudo: "Conteúdo 1", autor: "Autor 1" });
    await post.save();

    await request(app).delete(`/posts/${post._id}`).expect(200);

    const resposta = await Post.findById(post._id);
    expect(resposta).toBeNull();
  });
});

describe("PostController - Testes de falha", () => {
  it("Não deve listar posts quando não há posts", async () => {
    const resposta = await request(app).get("/posts").expect(200);
    expect(resposta.body.length).toBe(0);
  });

  it("Não deve listar um post com ID inválido", async () => {
    const resposta = await request(app).get("/posts/invalidID").expect(500);
    expect(resposta.body.message).toBe("falha na requisição do post");
  });

  it("Não deve buscar posts por palavras-chave inexistentes", async () => {
    const resposta = await request(app).get("/posts/search?keywords=nonexistent").expect(200);
    expect(resposta.body.length).toBe(0);
  });

  it("Não deve criar um novo post com dados inválidos", async () => {
    const novoPost = { titulo: "", conteudo: "", autor: "" };
    const resposta = await request(app).post("/posts").send(novoPost).expect(500);
    expect(resposta.body.message).toBe("falha ao cadastrar post");
  });

  it("Não deve atualizar um post com ID inválido", async () => {
    const atualizadoPost = { titulo: "Post Atualizado", conteudo: "Conteúdo Atualizado", autor: "Autor Atualizado" };
    const resposta = await request(app).put("/posts/invalidID").send(atualizadoPost).expect(500);
    expect(resposta.body.message).toBe("falha na atualização");
  });

  it("Não deve excluir um post com ID inválido", async () => {
    const resposta = await request(app).delete("/posts/invalidID").expect(500);
    expect(resposta.body.message).toBe("falha na exclusão");
  });
});
