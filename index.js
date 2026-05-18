const express = require("express");

const app = express();
app.use(express.json()); // faz o parse do body JSON automaticamente

// ==============================
// "Banco de dados" em memória
// ==============================
let users = [];

// GET /users  →  lista todos os usuários
app.get("/users", (req, res) => {
  res.json({ total: users.length, users });
});

// GET /users/:id  →  busca um usuário pelo ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(user);
});

// POST /users  →  cria um novo usuário
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Campos obrigatórios: name, email" });
  }

  const newUser = { id: new Date().getFullYear() + users.length+1, name, email, age: age ?? null };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id  →  atualiza um usuário por completo
app.put("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Usuário não encontrado" });

  const { name, email, age } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Campos obrigatórios: name, email" });
  }

  users[index] = { id: users[index].id, name, email, age: age ?? null };
  res.json(users[index]);
});

// PATCH /users/:id  →  atualiza parcialmente
app.patch("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Usuário não encontrado" });

  users[index] = { ...users[index], ...req.body, id: users[index].id };
  res.json(users[index]);
});

// DELETE /users/:id  →  remove um usuário
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Usuário não encontrado" });

  const [deleted] = users.splice(index, 1);
  res.json({ message: "Usuário removido com sucesso", user: deleted });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 API de Usuários rodando em http://localhost:${PORT}\n`);
});