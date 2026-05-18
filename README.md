# 📦 API CRUD de Usuários — Node.js (sem dependências)

API didática para aulas de desenvolvimento web. Roda com **Node.js puro**, sem
instalar nada.

---

## ▶️ Como rodar

```bash
node index.js
```

Servidor inicia em `http://localhost:3000`

---

## 🗂️ Rotas

| Método   | URL           | Ação                     |
|----------|---------------|--------------------------|
| GET      | /users        | Lista todos os usuários  |
| GET      | /users/:id    | Busca um usuário por ID  |
| POST     | /users        | Cria um novo usuário     |
| PUT      | /users/:id    | Atualiza (substitui)     |
| PATCH    | /users/:id    | Atualiza parcialmente    |
| DELETE   | /users/:id    | Remove um usuário        |

---

## 📋 Exemplos com `curl`

### Listar todos
```bash
curl http://localhost:3000/users
```

### Buscar por ID
```bash
curl http://localhost:3000/users/1
```

### Criar usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Carlos Souza", "email": "carlos@email.com", "age": 22}'
```

### Atualizar completo (PUT)
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Ana Silva Atualizada", "email": "ana.nova@email.com", "age": 29}'
```

### Atualizar parcial (PATCH)
```bash
curl -X PATCH http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"age": 30}'
```

### Deletar
```bash
curl -X DELETE http://localhost:3000/users/2
```

---

## 📐 Formato do usuário

```json
{
  "id": 1,
  "name": "Ana Silva",
  "email": "ana@email.com",
  "age": 28
}
```

- `id` — gerado automaticamente, não pode ser alterado
- `name` e `email` — obrigatórios no POST e PUT
- `age` — opcional

---

## ⚠️ Observações para a aula

- Os dados ficam **somente na memória RAM** — reiniciar o servidor apaga tudo.
- Não há autenticação — propositalmente simples para fins didáticos.
- Próximos passos sugeridos: adicionar banco de dados (SQLite, MongoDB), usar
  Express.js, adicionar validação com Zod, implementar JWT.