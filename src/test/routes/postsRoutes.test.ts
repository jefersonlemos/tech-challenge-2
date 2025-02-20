import { beforeEach, afterEach, describe, expect, it, jest } from "@jest/globals";
import request from "supertest";
import app from "../../app";
import { Server } from "http";

let server: Server | undefined;
beforeEach(() => {
  const port = process.env.PORT || 3000;
  server = app.listen(port);
});

afterEach(() => {
  server?.close();
});

describe("GET em /posts", () => {
  it("Deve retornar uma lista de posts", async () => {
    const resposta = await request(app)
      .get("/posts")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(resposta.body[0].titulo).toEqual("Tudo Sobre Teoria dos Conjuntos");
  });
});

let idResposta: string;
describe("POST em /posts", () => {
  it("Deve adicionar um novo post", async () => {
    const resposta = await request(app)
      .post("/posts")
      .send({
        titulo: "Teste",
        conteudo: "Conteudo do post de teste",
        autor: "Prof. Teste",
      })
      .expect(201);

    console.log(resposta.body); // Log the response body to see its structure

    // Ensure the response body has the expected structure
    expect(resposta.body).toHaveProperty("post._id");

    idResposta = resposta.body.post._id;
  });

  it("Deve não adicionar nada ao passar o body vazio", async () => {
    await request(app)
      .post("/posts")
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

describe("GET em /posts/search", () => {
  it("Deve retornar posts que correspondem à palavra-chave", async () => {
    const resposta = await request(app)
      .get("/posts/search?q=Teste")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(resposta.body).toBeInstanceOf(Array);
    expect(resposta.body.length).toBeGreaterThan(0);
    expect(resposta.body[0]).toHaveProperty("titulo", "Teste");
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
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe("DELETE em /posts/id", () => {
  it("Deletar o post adicionado", async () => {
    await request(app)
      .delete(`/posts/${idResposta}`)
      .expect(200);
  });
});
