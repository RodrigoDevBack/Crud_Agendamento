---

# App de Agendamentos

Aplicativo simples para gerenciar agendamentos com uma API própria (CRUD): criar, listar, editar e excluir agendamentos.

---

## Tecnologias

- Backend: Node.js, Express, TypeScript, Prisma, SQLite
- Frontend: Next.js (App Router), React, TypeScript

---

## Funcionalidades

- Criar agendamento (POST)
- Listar todos os agendamentos (GET)
- Atualizar status (PATCH)
- Excluir agendamento (DELETE)
- Persistência com SQLite através do Prisma

---

**Quick start (desenvolvimento)**

1. Backend

```bash
cd backend
npm install
npm run dev
```

O backend por padrão roda em `http://localhost:3001`.

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend usa o Next.js e por padrão roda em `http://localhost:3000`.

Se preferir configurar outra URL do backend, defina a variável de ambiente no frontend:

```bash
# no .env.local do frontend
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

---

## API (rotas principais)

- GET /api/agendamentos — lista todos os agendamentos (proxy para o backend)
- GET /api/agendamentos/concluded — lista agendamentos concluídos
- GET /api/agendamentos/not_concluded — lista agendamentos não concluídos
- POST /api/agendamentos — cria um agendamento
- PATCH /api/agendamentos — atualiza status de um agendamento
- DELETE /api/agendamentos — remove um agendamento

Exemplo rápido com curl:

```bash
# Listar todos
curl http://localhost:3000/api/agendamentos

# Criar (JSON)
curl -X POST http://localhost:3000/api/agendamentos \
    -H "Content-Type: application/json" \
    -d '{"nome":"João","servico":"Corte","data":"2025-12-10","hora":"14:00"}'
```

Observação: o frontend está configurado para chamar rotas sob `/api/*` (Next.js). Essas rotas fazem proxy para o backend (por exemplo `http://localhost:3001`).

---

## Estrutura do projeto (resumido)

```
Crud_Agendamento/
├─ backend/           # API Express + Prisma
├─ frontend/          # Next.js (app router)
└─ README.md
```

---

## Desenvolvimento / Observações

- Correções importantes realizadas: o frontend agora consome as rotas locais ` /api/agendamentos` do Next.js, que fazem requisições ao backend para evitar problemas de CORS e facilitar deploy.
- Para rodar em produção, ajuste as variáveis de ambiente `NEXT_PUBLIC_BACKEND_URL` (frontend) e a configuração do backend conforme necessário.

---

## Contato

**Autor:** Rodrigo Moraes

- LinkedIn: https://www.linkedin.com/in/rodrigo-moraes-7a65232b7/
- GitHub: https://github.com/RodrigoDevBack

---
