import "dotenv/config";
import express from "express";
import db from "./db.js";
import voluntarios from "./routes/voluntarios.js";

const app = express();
app.use(express.json());

app.get("/api/health", async (req, res) => {
  let banco = "ok";
  try {
    await db.query("SELECT 1");
  } catch {
    banco = "sem conexão";
  }
  res.json({ status: "ok", banco, app: "Ponte Voluntária", hora: new Date().toISOString() });
});

app.use("/api/voluntarios", voluntarios);

// Tratamento final de erros: qualquer erro não tratado nas rotas chega aqui.
app.use((erro, req, res, _next) => {
  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON inválido no corpo da requisição" });
  }
  console.error(erro);
  res.status(500).json({ erro: "Erro interno no servidor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
