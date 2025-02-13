import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import swaggerSetup from "./swagger.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI as string);

app.use(bodyParser.json());
swaggerSetup(app);

const PORT = process.env.PORT || 3000;

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
});

const Post = mongoose.model("Post", postSchema);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista de Posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Post'
 */
app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Leitura de Post
 *     tags: [Posts]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do post
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título do post
 *                 example: Dica de Gramática
 *               content:
 *                 type: string
 *                 description: Conteúdo do post
 *                 example: A crase é um acento grave indicativo de crase.
 *               author:
 *                 type: string
 *                 description: Autor do post
 *                 example: João da Silva
 *     responses:
 *       201:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Post'
 */
app.post("/posts", async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json(newPost);
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Edição de um Post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título do post
 *                 example: Dica de Gramática
 *               content:
 *                 type: string
 *                 description: Conteúdo do post
 *                 example: A crase é um acento grave indicativo de crase.
 *               author:
 *                 type: string
 *                 description: Autor do post
 *                 example: João da Silva
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do post
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
app.put("/posts/:id", async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedPost);
});

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deleta um Post
 *     tags: [Posts]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do post
 *     responses:
 *       204:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
app.delete("/posts/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// GET /posts/search - Busca de Posts
app.get("/posts/search", async (req, res) => {
  const term = req.query.q as string || ""; // Provide a default value
  const posts = await Post.find({
    $or: [{ title: new RegExp(term, "i") }, { content: new RegExp(term, "i") }],
  });
  res.json(posts);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});

/**
 * @swagger
 *components:
 *  schemas:
 *   Post:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: ID do post
 *         example: 67a4d111650febdeb677c4af
 *       title:
 *         type: string
 *         description: Título do post
 *         example: Dica de Gramática
 *       content:
 *         type: string
 *         description: Conteúdo do post
 *         example: A crase é um acento grave indicativo de crase.
 *       author:
 *         type: string
 *         description: Autor do post
 *         example: João da Silva
 *       __v:
 *         type: number
 *         description: Versão do documento
 *         example: 0
 */
