import { Router } from "express";
import db from "../db.js";
import { validarVoluntario } from "../validacao.js";

const router = Router();
const CAMPOS = "id_voluntario, nome, email, telefone, data_cadastro";

// GET /api/voluntarios
router.get("/", async (req, res) => {
  const [voluntarios] = await db.execute(`SELECT ${CAMPOS} FROM voluntario ORDER BY nome`);
  res.json(voluntarios);
});

// GET /api/voluntarios/:id
router.get("/:id", async (req, res) => {
  const [linhas] = await db.execute(`SELECT ${CAMPOS} FROM voluntario WHERE id_voluntario = ?`, [
    req.params.id,
  ]);
  if (linhas.length === 0) return res.status(404).json({ erro: "Voluntário não encontrado" });
  res.json(linhas[0]);
});

// POST /api/voluntarios
router.post("/", async (req, res) => {
  const erro = validarVoluntario(req.body);
  if (erro) return res.status(400).json({ erro });

  const nome = req.body.nome.trim();
  const email = req.body.email.trim();
  const telefone = req.body.telefone || null; // undefined não é aceito pelo mysql2: vira null

  try {
    const [resultado] = await db.execute(
      "INSERT INTO voluntario (nome, email, telefone) VALUES (?, ?, ?)",
      [nome, email, telefone],
    );
    res.status(201).json({ id_voluntario: resultado.insertId, nome, email, telefone });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") return res.status(409).json({ erro: "E-mail já cadastrado" });
    throw e;
  }
});

// PUT /api/voluntarios/:id
router.put("/:id", async (req, res) => {
  const erro = validarVoluntario(req.body);
  if (erro) return res.status(400).json({ erro });

  const nome = req.body.nome.trim();
  const email = req.body.email.trim();
  const telefone = req.body.telefone || null;

  try {
    const [resultado] = await db.execute(
      "UPDATE voluntario SET nome = ?, email = ?, telefone = ? WHERE id_voluntario = ?",
      [nome, email, telefone, req.params.id],
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: "Voluntário não encontrado" });
    }
    res.json({ id_voluntario: Number(req.params.id), nome, email, telefone });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") return res.status(409).json({ erro: "E-mail já cadastrado" });
    throw e;
  }
});

// DELETE /api/voluntarios/:id
router.delete("/:id", async (req, res) => {
  try {
    const [resultado] = await db.execute("DELETE FROM voluntario WHERE id_voluntario = ?", [
      req.params.id,
    ]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: "Voluntário não encontrado" });
    }
    res.status(204).end();
  } catch (e) {
    if (e.code === "ER_ROW_IS_REFERENCED_2") {
      return res
        .status(409)
        .json({ erro: "Voluntário possui inscrições registradas e não pode ser excluído" });
    }
    throw e;
  }
});

export default router;
