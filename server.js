const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
});

const Post = mongoose.model("Post", postSchema);

// GET /posts - Lista de Posts
app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// GET /posts/:id - Leitura de Posts
app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

// POST /posts - Criação de Postagens
app.post("/posts", async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json(newPost);
});

// PUT /posts/:id - Edição de Postagens
app.put("/posts/:id", async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedPost);
});

// DELETE /posts/:id - Exclusão de Postagens
app.delete("/posts/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// GET /posts/search - Busca de Posts
app.get("/posts/search", async (req, res) => {
  const term = req.query.q;
  const posts = await Post.find({
    $or: [{ title: new RegExp(term, "i") }, { content: new RegExp(term, "i") }],
  });
  res.json(posts);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
