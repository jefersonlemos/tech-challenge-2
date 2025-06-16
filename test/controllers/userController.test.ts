import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import authMiddleware from "../../src/middleware/authMiddleware";
import UserController from "../../src/controllers/userController";
import User from "../../src/models/User";

const app = express();
app.use(express.json());

app.post("/register", UserController.register);
app.post("/login", UserController.login);

app.get("/users", authMiddleware, UserController.listarUsers);
app.get("/users/search", authMiddleware, UserController.listarUsersPorPalavrasChave);
app.get("/users/:id", authMiddleware, UserController.listarUsersPorId);
app.post("/users", authMiddleware, UserController.cadastrarUser);
app.put("/users/:id", authMiddleware, UserController.atualizarUser);
app.delete("/users/:id", authMiddleware, UserController.excluirUser);

let mongoServer: MongoMemoryServer;

// Store the token for authenticated tests
let authTokenTeacher: string;
let authTokenStudent: string;

let studentResponse: request.Response = {} as request.Response;

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
  studentResponse = await request(app).post("/register").send(testUserStudent).expect(201);

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
  await User.deleteMany({});
});

// Add helper function
const createTestUser = (email: string, role: "teacher" | "student" = "teacher") => {
  return new User({ role, email, password: "senha123" });
};

describe("UserController - Testes de sucesso", () => {
  it("Deve listar todos os users apenas para o professor", async () => {
    const user = await createTestUser("user1@test.com").save();
    const resposta = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .expect(200);
    expect(resposta.body.length).toBe(3);
    expect(resposta.body[2].email).toBe(user.email);
  });

  it("Deve listar um user por ID", async () => {
    const user = await createTestUser("user2@test.com").save();
    const resposta = await request(app)
      .get(`/users/${user._id}`)
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .expect(200);
    expect(resposta.body.email).toBe(user.email);
  });

  it("Deve buscar users por palavras-chave", async () => {
    const user = await createTestUser("user4@test.com").save();
    const resposta = await request(app)
      .get("/users/search?q=user4")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .expect(200);
    expect(resposta.body.length).toBe(1);
    expect(resposta.body[0].email).toBe(user.email);
  });

  it("Deve criar um novo user", async () => {
    const user = { role: "teacher", email: "user5@test.com", password: "senha123" };
    const resposta = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .send(user);
    expect(resposta.status).toBe(201);
    expect(resposta.body.userCriado.email).toBe(user.email);
    expect(resposta.body.message).toBe("Usuário criado com sucesso!");
  });

  it("Deve atualizar um user", async () => {
    const user = await createTestUser("user6@test.com").save();
    const atualizadoUser = { role: "student", email: "user6@test.com", password: "senha123" };
    const resposta = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .send(atualizadoUser)
      .expect(200);

    const respostaAgain = await User.findById(user._id);
    expect(respostaAgain?.role).toBe("student");
    expect(resposta.body.message).toBe("Usuário atualizado com sucesso!");
  });

  it("Deve excluir um user", async () => {
    const user = await createTestUser("user7@test.com").save();

    const resposta = await request(app)
      .delete(`/users/${user._id}`)
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .expect(200);

    const respostaAgain = await User.findById(user._id);
    expect(respostaAgain).toBeNull();
    expect(resposta.body.message).toBe("Usuário excluído com sucesso!");
  });

  it("Deve listar o próprio user autenticado", async () => {
    const resposta = await request(app)
      .get(`/users/${studentResponse.body.user._id}`)
      .set("Authorization", `Bearer ${authTokenStudent}`);
    expect(resposta.status).toBe(200);
    expect(resposta.body.email).toBe(studentResponse.body.user.email);
  });
});

describe("UserController - Testes de falha", () => {
  it("Não deve listar users quando não há users", async () => {
    await User.deleteMany({});
    const resposta = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .expect(404);
    expect(resposta.body.message).toBe("Nenhum usuário encontrado.");
  });

  it("Não deve listar um user com ID inválido", async () => {
    const resposta = await request(app)
      .get("/users/123456789012345678901234")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .expect(404);
    expect(resposta.body.message).toBe("Usuário não encontrado.");
  });

  it("Não deve buscar users por palavras-chave inexistentes", async () => {
    const resposta = await request(app)
      .get("/users/search?q=nonexistent")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .expect(404);
    expect(resposta.body.message).toBe("Nenhum usuário encontrado com as palavras-chave fornecidas.");
  });

  it("Não deve criar um novo user sem autenticação", async () => {
    const novoUser = { role: "teacher", email: "user5@test.com", password: "senha123" };
    const resposta = await request(app)
      .post("/users")
      .send(novoUser)
      .expect(401); // Unauthorized
    expect(resposta.body.message).toBe("Token ausente");
  });

  it("Não deve atualizar um user sem autenticação", async () => {
    const user = await createTestUser("user9@test.com").save();
    const atualizadoUser = { role: "teacher", email: "user9@test.com", password: "novaSenha123" };
    const resposta = await request(app)
      .put(`/users/${user._id}`)
      .send(atualizadoUser)
      .expect(401); // Unauthorized
    expect(resposta.body.message).toBe("Token ausente");
  });

  it("Não deve excluir um user sem autenticação", async () => {
    const user = await createTestUser("user10@test.com").save();
    const resposta = await request(app)
      .delete(`/users/${user._id}`)
      .expect(401); // Unauthorized
    expect(resposta.body.message).toBe("Token ausente");
  });

  it("Não deve criar um novo user com dados inválidos", async () => {
    const novoUser = { role: "teacher", email: "", password: "" };
    const resposta = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .send(novoUser)
      .expect(500);
    expect(resposta.body.message).toBe("Falha ao cadastrar novo usuário.");
  });

  it("Não deve atualizar um user com ID inválido", async () => {
    const atualizadoUser = { role: "teacher", email: "user11@test.com", password: "novaSenha123" };
    const resposta = await request(app)
      .put("/users/123456789012345678901234")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .send(atualizadoUser)
      .expect(404);
    expect(resposta.body.message).toBe("Usuário não encontrado");
  });

  it("Não deve excluir um user com ID inválido", async () => {
    const resposta = await request(app)
      .delete("/users/123456789012345678901234")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .expect(404);
    expect(resposta.body.message).toBe("Usuário não encontrado");
  });

  it("Não deve criar um novo user com email já existente", async () => {
    const user = await createTestUser("user11@test.com").save();
    const novoUser = { role: user.role, email: "user11@test.com", password: user.password };
    const resposta = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .send(novoUser)
      .expect(500);
    expect(resposta.body.message).toBe("Falha ao cadastrar novo usuário.");
  });

  it("Não deve atualizar um user com email já existente", async () => {
    const user1 = await createTestUser("user12@test.com").save();
    const user2 = await createTestUser("user13@test.com").save();
    const atualizadoUser = { role: user1.role, email: "user12@test.com", password: user1.password };
    const resposta = await request(app)
      .put(`/users/${user2._id}`)
      .set("Authorization", `Bearer ${authTokenTeacher}`)
      .send(atualizadoUser)
      .expect(500);
    expect(resposta.body.message).toBe("Falha ao atualizar usuário");
  });

  it("Não deve criar um novo user com role student", async () => {
    const novoUser = { role: "student", email: "user14@test.com", password: "senha123" };
    const resposta = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .send(novoUser)
      .expect(403);
    expect(resposta.body.message).toBe("Acesso negado. Apenas professores podem criar usuários.");
  });

  it("Não deve atualizar um usuário com role student", async () => {
    const user = await createTestUser("user15@test.com").save();
    const atualizadoUser = { role: "student", email: "user15@test.com", password: "novaSenha123" };
    const resposta = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .send(atualizadoUser)
      .expect(403);
    expect(resposta.body.message).toBe("Acesso negado. Apenas professores podem atualizar usuários.");
  });

  it("Não deve excluir um user com role student", async () => {
    const user = await createTestUser("user16@test.com").save();
    const resposta = await request(app)
      .delete(`/users/${user._id}`)
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .expect(403);
    expect(resposta.body.message).toBe("Acesso negado. Apenas professores podem excluir usuários.");
  });

  it("Não deve listar users com role student", async () => {
    await createTestUser("user17@test.com").save();
    const resposta = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .expect(403);
    expect(resposta.body.message).toBe("Acesso negado. Apenas professores podem acessar usuários.");
  });

  it("Não deve listar user com role student, se não for o próprio", async () => {
    const user = await createTestUser("user17@test.com").save();
    const resposta = await request(app)
      .get(`/users/${user._id}`)
      .set("Authorization", `Bearer ${authTokenStudent}`)
      .expect(403);
    expect(resposta.body.message).toBe("Acesso negado. Apenas professores podem acessar usuários.");
  });
});
