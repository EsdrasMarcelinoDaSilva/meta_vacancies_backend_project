# 🔍 Meta Vacancies — API de Busca de Vagas

API REST para busca e gerenciamento de vagas de emprego para desenvolvedores. Permite que candidatos se cadastrem, autentiquem e pesquisem oportunidades filtradas por tecnologia, nível e localização.

## ✨ Funcionalidades

- 🔐 **Autenticação JWT** com registro e login de usuários
- 💼 **CRUD completo de vagas** (criação, listagem, atualização e remoção)
- 👤 **Gestão de candidatos** e perfis
- 🏢 **Gestão de empresas** anunciantes
- 🔗 **Relacionamento entre entidades** (vaga ↔ empresa ↔ candidato)
- ✅ **Testes unitários e de integração** com cobertura de código

## 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| Node.js | Runtime |
| TypeScript | Linguagem principal |
| Express | Framework HTTP |
| MongoDB + Mongoose | Banco de dados |
| JWT + jsonwebtoken | Autenticação |
| Yup | Validação de dados |
| Vitest | Testes unitários |
| Supertest | Testes de integração |

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 18+
- MongoDB (local ou Atlas)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/EsdrasMarcelinoDaSilva/meta_vacancies_backend_project.git
cd meta_vacancies_backend_project

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

### Variáveis de ambiente

```env
MONGO_URI=mongodb://localhost:27017/meta_vacancies
PORT=3000
JWT_SECRET=sua_chave_jwt_secreta
```

### Rodando a aplicação

```bash
# Modo de desenvolvimento
npm run dev

# Modo de produção
npm run start
```

### Rodando os testes

```bash
# Todos os testes (unitários + integração)
npm test

# Cobertura de testes
npm run test:cov
```

## 📁 Estrutura do projeto

```
meta_vacancies_backend_project/
├── src/
│   ├── controllers/   # Lógica das rotas
│   ├── models/        # Modelos do MongoDB (Mongoose)
│   ├── routes/        # Definição das rotas
│   ├── middlewares/   # Autenticação JWT e validação
│   └── services/      # Regras de negócio
├── __test__/          # Testes unitários e de integração
├── routes.ts          # Registro central de rotas
└── tsconfig.json
```

## 🔗 Principais endpoints

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/auth/register` | Cadastro de usuário | ❌ |
| POST | `/auth/login` | Login e geração de token | ❌ |
| GET | `/vacancies` | Listar vagas | ✅ |
| POST | `/vacancies` | Criar vaga | ✅ |
| PUT | `/vacancies/:id` | Atualizar vaga | ✅ |
| DELETE | `/vacancies/:id` | Remover vaga | ✅ |
| GET | `/companies` | Listar empresas | ✅ |

## 🔧 Decisões técnicas

- **Vitest** — testes rápidos com API compatível com Jest, sem configuração extra
- **Supertest** — testes de integração simulando requisições HTTP reais
- **Yup** — validação declarativa de schemas nos DTOs de entrada
- **Mongoose** — modelagem de dados com schemas tipados para MongoDB
