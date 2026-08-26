# API CRUD de Alunos e Professores

API didática em Node.js, Express e MySQL, sem ORM. Os dados são persistidos no
banco local.

---

## ▶️ Como rodar

Instale as dependências:

```bash
npm install
```

Crie um banco MySQL e as tabelas executando o arquivo `schema.sql`. Depois,
copie `.env.example` para `.env` e ajuste usuário, senha e nome do banco.

Inicie a API:

```bash
npm run dev
```

O servidor inicia em `http://localhost:3000` somente depois de validar a
conexão com o MySQL.

---

## Rotas

| Método   | URL           | Ação                     |
|----------|---------------|--------------------------|
| GET      | /alunos       | Lista todos os alunos    |
| POST     | /alunos       | Cria um aluno            |
| PUT      | /alunos/:id   | Atualiza um aluno        |
| DELETE   | /alunos/:id   | Remove um aluno          |
| GET      | /professores  | Lista todos os professores |
| POST     | /professores  | Cria um professor        |
| PUT      | /professores/:id | Atualiza um professor |
| DELETE   | /professores/:id | Remove um professor  |

---

### Criar aluno
```bash
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Carlos Souza","dataNasc":"2004-02-10","email":"carlos@email.com"}'
```

### Listar alunos
```bash
curl http://localhost:3000/alunos
```