# node-extras-app-alunos

API REST simples com Node.js, Express e MySQL para gerenciar produtos e usuários.

## 🚀 Visão geral

Este projeto oferece:
- CRUD de produtos conectado a MySQL
- CRUD de usuários em memória (array)
- Exemplo prático de rotas Express e uso de `mysql` com query builder simples

## ▶️ Requisitos

- Node.js 16+
- MySQL acessível (configuração em `index.js`)

## 📦 Dependências

- `express`: Framework web para Node.js
- `mysql`: Driver MySQL para Node.js
- `cors`: Middleware para habilitar CORS
- `dotenv`: Carregamento de variáveis de ambiente
- `nodemon`: Ferramenta para desenvolvimento (reinício automático)

## 🧭 Como rodar

1. Clone o repositório
2. Instale dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` a partir do exemplo:
   ```bash
   cp .env.example .env
   ```
   Atualize os valores conforme seu banco.
4. Execute o servidor:
   ```bash
   npm start
   ```
   Ou para desenvolvimento (com nodemon):
   ```bash
   npm run dev
   ```
5. Acesse os endpoints em `http://localhost:3000`

> ⚠️ A conexão MySQL usa variáveis de ambiente via `.env` (dotenv). O arquivo `.env` não deve ser comitado.

## 🧩 Endpoints da API

### Produtos (MySQL)

- `GET /produtos`
  - Retorna todos os produtos em ordem decrescente de `id`

- `GET /produto/:id`
  - Retorna o produto específico pelo `id`

- `POST /produto/`
  - Cria um novo produto com JSON no corpo
  - Validação mínima:
    - `nome`: string não vazia
    - `preco`: número
    - `estoque`: número
  - Exemplo:
    ```json
    {
      "nome": "Caneca",
      "preco": 29.9,
      "estoque": 12
    }
    ```
  - Retorna JSON:
    ```json
    { "status": 201, "insertId": 1 }
    ```

- `PUT /produto/:id`
  - Atualiza campos do produto pelo `id`
  - Use JSON com os campos a atualizar:
    ```json
    {
      "nome": "Caneca Nova",
      "preco": 35.5,
      "estoque": 10
    }
    ```
  - Retorna JSON de status com mensagem

- `DELETE /produto/:id`
  - Remove o produto
  - Retorna JSON de status com mensagem

### Usuários (in-memory)

- `GET /usuarios/`
  - Retorna todos os usuários do array em memória

- `POST /usuarios/`
  - Adiciona usuário: `{ "nome": "nome" }`
  - Retorna mensagem de sucesso

- `PUT /usuarios/:id`
  - Atualiza usuário pelo índice 1-based: `{ "nome": "novo nome" }`
  - Retorna mensagem de sucesso

- `DELETE /usuarios/:id`
  - Remove usuário pelo índice 1-based (usando `delete` no array)
  - Retorna mensagem de sucesso

## 🛑 Observações

- Usuários são mantidos apenas em memória e não persistem após restart.
- SQL no código é construído com template string em alguns endpoints. Não use esse padrão em produção (risco de injeção SQL).
- Para produção:
  1. Use variáveis de ambiente para host, user, password, database
  2. Use validação e tratamento centralizado de erros
  3. Use ORM ou query builder (Sequelize, Knex) para segurança

## ✅ Melhorias recomendadas

- Configurar `.env` e `dotenv`
- Separar rotas e controllers em arquivos/module
- Criar camada de serviço/banco com pool de conexões MySQL
- Adicionar testes unitários e de integração
- Implementar autenticação/autorizações para recursos protegidos


