import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import PostController from "../../src/controllers/postController";
import Post from "../../src/models/Post";
import authMiddleware from "../../src/middleware/authMiddleware";
import UserController from "../../src/controllers/userController";
import User from "../../src/models/User";

const app = express();
app.use(express.json());

app.post("/register", UserController.register);
app.post("/login", UserController.login);

app.get("/posts", PostController.listarPosts);
app.get("/posts/search", PostController.listarPostsPorPalavrasChave);
app.get("/posts/:id", PostController.listarPostPorId);
app.post("/posts", authMiddleware, PostController.cadastrarPost);
app.put("/posts/:id", authMiddleware, PostController.atualizarPost);
app.delete("/posts/:id", authMiddleware, PostController.excluirPost);

let mongoServer: MongoMemoryServer;
let authToken: string; // Store the token for authenticated tests

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Create a test user and get token before each test
  const testUser = {
    email: "test@test.com",
    password: "testpassword123"
  };

  // Register user
  await request(app)
    .post("/register")
    .send(testUser)
    .expect(201);

  // Login and get token
  const loginResponse = await request(app)
    .post("/login")
    .send({
      email: testUser.email,
      password: testUser.password
    })
    .expect(200);

  authToken = loginResponse.body.token;
});

afterEach(async () => {
  await Post.deleteMany({});
  await User.deleteMany({});
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
    const resposta = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${authToken}`)
      .send(novoPost)
      .expect(201);

    expect(resposta.body.post.titulo).toBe("Novo Post");
  });

  it("Deve atualizar um post", async () => {
    const post = new Post({ titulo: "Post 1", conteudo: "Conteúdo 1", autor: "Autor 1" });
    await post.save();

    const atualizadoPost = { titulo: "Post Atualizado", conteudo: "Conteúdo Atualizado", autor: "Autor Atualizado" };
    await request(app)
      .put(`/posts/${post._id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(atualizadoPost)
      .expect(200);

    const resposta = await Post.findById(post._id);
    expect(resposta?.titulo).toBe("Post Atualizado");
  });

  it("Deve excluir um post", async () => {
    const post = new Post({ titulo: "Post 1", conteudo: "Conteúdo 1", autor: "Autor 1" });
    await post.save();

    await request(app)
      .delete(`/posts/${post._id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

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
    const resposta = await request(app).get("/posts/invalidID").expect(404);
    expect(resposta.body.message).toBe("Falha na requisição do post.");
  });

  it("Não deve buscar posts por palavras-chave inexistentes", async () => {
    const resposta = await request(app).get("/posts/search?keywords=nonexistent").expect(200);
    expect(resposta.body.length).toBe(0);
  });

  it("Não deve criar um novo post sem autenticação", async () => {
    const novoPost = { titulo: "Novo Post", conteudo: "Conteúdo do novo post", autor: "Novo Autor" };
    await request(app)
      .post("/posts")
      .send(novoPost)
      .expect(401); // Unauthorized
  });

  it("Não deve criar um novo post com dados inválidos", async () => {
    const novoPost = { titulo: "", conteudo: "", autor: "" };
    const resposta = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${authToken}`)
      .send(novoPost)
      .expect(500);
    expect(resposta.body.message).toBe("Falha ao cadastrar novo post.");
  });

  it("Não deve atualizar um post sem autenticação", async () => {
    const post = new Post({ titulo: "Post 1", conteudo: "Conteúdo 1", autor: "Autor 1" });
    await post.save();

    const atualizadoPost = { titulo: "Post Atualizado", conteudo: "Conteúdo Atualizado", autor: "Autor Atualizado" };
    await request(app)
      .put(`/posts/${post._id}`)
      .send(atualizadoPost)
      .expect(401); // Unauthorized
  });

  it("Não deve excluir um post sem autenticação", async () => {
    const post = new Post({ titulo: "Post 1", conteudo: "Conteúdo 1", autor: "Autor 1" });
    await post.save();

    await request(app)
      .delete(`/posts/${post._id}`)
      .expect(401); // Unauthorized
  });

  it("Não deve criar um novo post com dados inválidos", async () => {
    const novoPost = { titulo: "", conteudo: "", autor: "" };
    const resposta = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${authToken}`)
      .send(novoPost)
      .expect(500);
    expect(resposta.body.message).toBe("Falha ao cadastrar novo post.");
  });

  it("Não deve atualizar um post com ID inválido", async () => {
    const atualizadoPost = { titulo: "Post Atualizado", conteudo: "Conteúdo Atualizado", autor: "Autor Atualizado" };
    const resposta = await request(app)
      .put("/posts/invalidID")
      .set("Authorization", `Bearer ${authToken}`)
      .send(atualizadoPost)
      .expect(500);
    expect(resposta.body.message).toBe("Falha na atualização do post.");
  });

  it("Não deve excluir um post com ID inválido", async () => {
    const resposta = await request(app)
      .delete("/posts/invalidID")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(500);
    expect(resposta.body.message).toBe("Falha na exclusão do post.");
  });
});
