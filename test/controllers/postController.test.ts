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

// Store the token for authenticated tests
let authTokenTeacher: string;
let authTokenStudent: string;

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
  // Clear data first
  await User.deleteMany({});
  await Post.deleteMany({});

  const testUserTeacher = {
    email: "teacher@test.com",  // Different emails
    password: "testpassword123",
    role: "teacher" as const,
  };

  const testUserStudent = {
    email: "student@test.com",  // Different emails
    password: "testpassword123",
    role: "student" as const,
  };

  // Register both users
  await request(app).post("/register").send(testUserTeacher).expect(201);
  await request(app).post("/register").send(testUserStudent).expect(201);

  // Get tokens
  const teacherLogin = await request(app)
    .post("/login")
    .send({ email: testUserTeacher.email, password: testUserTeacher.password, role: "teacher" })
    .expect(200);

  const studentLogin = await request(app)
    .post("/login")
    .send({ email: testUserStudent.email, password: testUserStudent.password, role: "student" })
    .expect(200);

  authTokenTeacher = teacherLogin.body.token;
  authTokenStudent = studentLogin.body.token;
});

afterEach(async () => {
  await Post.deleteMany({});
  await User.deleteMany({});
});

// Add helper function
const createTestPost = (titulo: string, conteudo: string, autor: string) => {
  return new Post({ titulo, conteudo, autor });
};

describe("PostController - Testes de sucesso", () => {
  it("Deve listar todos os posts", async () => {
    await createTestPost("Post 1", "Conteúdo 1", "Autor 1").save();

    const resposta = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .expect(200);
    expect(resposta.body.length).toBe(1);
    expect(resposta.body[0].titulo).toBe("Post 1");
  });

  it("Deve listar um post por ID", async () => {
    const post = await createTestPost("Post 1", "Conteúdo 1", "Autor 1").save();

    const resposta = await request(app)
      .get(`/posts/${post._id}`)
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .expect(200);
    expect(resposta.body.titulo).toBe("Post 1");
  });

  it("Deve buscar posts por palavras-chave", async () => {
    await createTestPost("Post Teste 1", "Conteúdo 1", "Autor 1").save();

    const resposta = await request(app)
      .get("/posts/search?q=Post Teste 1")
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .expect(200);
    expect(resposta.body.length).toBe(1);
    expect(resposta.body[0].titulo).toBe("Post Teste 1");
  });

  it("Deve criar um novo post", async () => {
    const novoPost = { titulo: "Novo Post", conteudo: "Conteúdo do novo post", autor: "Novo Autor" };
    const resposta = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .send(novoPost)
      .expect(201);
    expect(resposta.body.message).toBe("Post criado com sucesso!");
  });

  it("Deve atualizar um post", async () => {
    const post = await createTestPost("Post 1", "Conteúdo 1", "Autor 1").save();

    const atualizadoPost = { titulo: "Post Atualizado", conteudo: "Conteúdo Atualizado", autor: "Autor Atualizado" };
    await request(app)
      .put(`/posts/${post._id}`)
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .send(atualizadoPost)
      .expect(200);

    const respostaAgain = await Post.findById(post._id);
    expect(respostaAgain?.titulo).toBe("Post Atualizado");
  });

  it("Deve excluir um post", async () => {
    const post = await createTestPost("Post 1", "Conteúdo 1", "Autor 1").save();

    const resposta = await request(app)
      .delete(`/posts/${post._id}`)
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .expect(200);
    expect(resposta.body.message).toBe("Post excluído com sucesso.");

    const respostaAgain = await Post.findById(post._id);
    expect(respostaAgain).toBeNull();
  });
});

describe("PostController - Testes de falha", () => {
  it("Não deve listar posts quando não há posts", async () => {
    const resposta = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .expect(404);
    expect(resposta.body.message).toBe("Nenhum post encontrado.");
  });

  it("Não deve listar um post com ID inválido", async () => {
    const resposta = await request(app)
      .get("/posts/123456789012345678901234")
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .expect(404);
    expect(resposta.body.message).toBe("Post não encontrado.");
  });

  it("Não deve buscar posts por palavras-chave inexistentes", async () => {
    const resposta = await request(app)
      .get("/posts/search?q=nonexistent")
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .expect(404);
    expect(resposta.body.message).toBe("Nenhum post encontrado com as palavras-chave fornecidas.");
  });

  it("Não deve criar um novo post sem autenticação", async () => {
    const novoPost = { titulo: "Novo Post", conteudo: "Conteúdo do novo post", autor: "Novo Autor" };
    const resposta = await request(app)
      .post("/posts")
      .send(novoPost)
      .expect(401); // Unauthorized
    expect(resposta.body.message).toBe("Token ausente");
  });

  it("Não deve criar um novo post com dados inválidos", async () => {
    const novoPost = { titulo: "", conteudo: "", autor: "" };
    const resposta = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .send(novoPost)
      .expect(500);
    expect(resposta.body.message).toBe("Falha ao cadastrar novo post.");
  });

  it("Não deve criar um post com role student", async () => {
    const novoPost = { titulo: "Novo Post", conteudo: "Conteúdo do novo post", autor: "Novo Autor" };
    const resposta = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .send(novoPost)
      .expect(403); // Forbidden
    expect(resposta.body.message).toBe("Acesso negado. Apenas professores podem criar posts.");
  });

  it("Não deve atualizar um post sem autenticação", async () => {
    const post = await createTestPost("Post 1", "Conteúdo 1", "Autor 1").save();

    const atualizadoPost = { titulo: "Post Atualizado", conteudo: "Conteúdo Atualizado", autor: "Autor Atualizado" };
    const resposta = await request(app)
      .put(`/posts/${post._id}`)
      .send(atualizadoPost)
      .expect(401); // Unauthorized
    expect(resposta.body.message).toBe("Token ausente");
  });

  it("Não deve atualizar um post com role student", async () => {
    const post = await createTestPost("Post 1", "Conteúdo 1", "Autor 1").save();

    const atualizadoPost = { titulo: "Post Atualizado", conteudo: "Conteúdo Atualizado", autor: "Autor Atualizado" };
    const resposta = await request(app)
      .put(`/posts/${post._id}`)
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .send(atualizadoPost)
      .expect(403); // Forbidden
    expect(resposta.body.message).toBe("Acesso negado. Apenas professores podem atualizar posts.");
  });

  it("Não deve atualizar um post com ID inválido", async () => {
    const atualizadoPost = { titulo: "Post Atualizado", conteudo: "Conteúdo Atualizado", autor: "Autor Atualizado" };
    const resposta = await request(app)
      .put("/posts/123456789012345678901234")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .send(atualizadoPost)
      .expect(404);
    expect(resposta.body.message).toBe("Post não encontrado.");
  });

  it("Não deve excluir um post sem autenticação", async () => {
    const post = await createTestPost("Post 1", "Conteúdo 1", "Autor 1").save();

    const resposta = await request(app)
      .delete(`/posts/${post._id}`)
      .expect(401); // Unauthorized
    expect(resposta.body.message).toBe("Token ausente");
  });

  it("Não deve excluir um post com ID inválido", async () => {
    const resposta = await request(app)
      .delete("/posts/123456789012345678901234")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .expect(404);
    expect(resposta.body.message).toBe("Post não encontrado.");
  });

  it("Não deve excluir um post com role student", async () => {
    const post = await createTestPost("Post 1", "Conteúdo 1", "Autor 1").save();

    const resposta = await request(app)
      .delete(`/posts/${post._id}`)
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .expect(403); // Forbidden
    expect(resposta.body.message).toBe("Acesso negado. Apenas professores podem excluir posts.");
  });
});
