------------------------------------------------------------
# App de Agendamentos – Teste Técnico (Full Stack Estágio) 

## Este repositório contém minha solução para o Teste Técnico de Estagiário(a) Full Stack – Mobile/Web da Rede GESS.

### O projeto consiste em um aplicativo simples de agendamento integrado a uma API própria, permitindo criar, listar e excluir agendamentos.

------------------------------------------------------------

## Tecnologias Utilizadas

### Backend

- Node.js

- Express

- Banco de Dados SQLite

- Prisma

- Node + Nodemon

### Frontend

- Next.js

------------------------------------------------------------

## Funcionalidades Implementadas

### Backend

- POST /agendamentos – cria um agendamento

- GET /agendamentos – lista todos

- DELETE /agendamentos/:id – remove um agendamento

- Conexão com banco de dados

- Tratamento básico de erros

### Frontend

- Tela de listagem de agendamentos

- Tela/formulário para criar novo agendamento

- Opção de excluir

- Consumo da API desenvolvida

------------------------------------------------------------

## 🛠 Como rodar o projeto

### Backend:

`cd backend`

`npm install`

`npm run dev`

### Frontend:

`cd frontendnpm install`

`npm start`

`React Native:`

`npx expo start`

------------------------------------------------------------

## Endpoints da API

`POST /agendamentos – Criar agendamento`

`GET /agendamentos – Listar todos`

`DELETE /agendamentos/:id – Excluir agendamento`

------------------------------------------------------------

## Estrutura do Projeto

```
/TESTE-TECNICO-ESTAGIARIO-DEV-FULL-STACK--MOBILE-WEB-
├── /backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   ├── prisma/schema.prisma
│   ├── package.json
│   └── tsconfig.json
│
└── /frontend
    ├── src/
    │   ├── components/
    │   └── app/
    │       └── page.tsx
    ├── next.config.js
    └── package.json

```

------------------------------------------------------------

## 🖼 Prints / Demonstração

`Incluir links ou imagens no GitHub.`

------------------------------------------------------------

## Extras implementados

```
- Deploy
- Componentização
- UI melhorada
- Dark Mode
```

------------------------------------------------------------

## Observações Finais
`Espaço para o candidato comentar sobre dificuldades, aprendizados e melhorias.`

------------------------------------------------------------

## Autor(a)

### Rodrigo Moraes

### LinkedIn: https://www.linkedin.com/in/rodrigo-moraes-7a65232b7/

### GitHub: https://github.com/RodrigoDevBack
