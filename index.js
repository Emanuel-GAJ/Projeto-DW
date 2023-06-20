import express from "express";
import { listFiles } from "./utils/files.js";

const server = express();

// cors
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Configurar o express para receber JSON
server.use(express.json());

// Configurar pasta publica
server.use(express.static("public"));

server.get("/arquivos", async (req, res) => {
  // const files = await listFiles();
  const files = await listFiles("backup");

  res.json(files);
});

// Teste de rota para listar arquivos em um diretório específico.
server.post("/arquivos", async (req, res) => {
  const path = req.body.path;

  const files = await listFiles(path);

  res.json(files);
});

server.listen(3000, () => {
  console.log("Server is listening on http://localhost:3000");
});
