import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Post from "@/models/Post";

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

describe("Post Model Test", () => {
  it("Deve criar e salvar um post com sucesso", async () => {
    const validPost = new Post({
      titulo: "Teste de Integração",
      conteudo: "Conteúdo do post de teste",
      autor: "Autor Teste",
    });
    const savedPost = await validPost.save();

    expect(savedPost._id).toBeDefined();
    expect(savedPost.titulo).toBe("Teste de Integração");
    expect(savedPost.conteudo).toBe("Conteúdo do post de teste");
    expect(savedPost.autor).toBe("Autor Teste");
    expect(savedPost.criado_em).toBeDefined();
    expect(savedPost.atualizado_em).toBeDefined();
  });

  it("Deve falhar ao criar um post sem o campo obrigatório 'titulo'", async () => {
    const invalidPost = new Post({
      conteudo: "Conteúdo do post de teste",
      autor: "Autor Teste",
    });

    let err: unknown;
    try {
      await invalidPost.save();
    } catch (error) {
      err = error;
    }

    if (err instanceof mongoose.Error.ValidationError) {
      expect(err.errors.titulo).toBeDefined();
    } else {
      throw err;
    }
  });
});
