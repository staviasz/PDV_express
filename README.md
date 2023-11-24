# Configuração do Projeto BitBarbaros


## Pré-requisitos

- Node.js e npm instalados: [Node.js](https://nodejs.org/)
- PostgreSQL instalado: [PostgreSQL](https://www.postgresql.org/download/)

## Passo 1: Clonar o Repositório

```bash
git clone git@github.com:staviasz/BitBarbaros.git
cd pdv-projeto
```

## Passo 2: Instalar Dependências

```bash
npm install
```

## Passo 3: Criar o Banco de Dados 'pdv' Localmente
Certifique-se de ter o PostgreSQL instalado e execute os seguintes comandos:

```bash
psql -U seu_usuario -h localhost -W
CREATE DATABASE pdv;
```

## Passo 4: Configurar o Arquivo .env

  - Copie o arquivo envExample e renomeie para .env.
  - Edite o arquivo .env e configure as variáveis de ambiente conforme necessário, incluindo as credenciais do PostgreSQL.

## Passo 5: Executar Migrações

```bash
npx knex migrate:latest
```

Este comando aplicará todas as migrações pendentes e criará as tabelas necessárias no banco de dados 'pdv'.

## Passo 6: Executar as Seeds

```bash
npx knex seed:run
```

Este comando executará as sementes para inserir dados iniciais nas tabelas.

## Executar o Projeto
Após completar os passos acima, você pode iniciar o projeto localmente:

```bash
npm run dev
```

O servidor estará disponível em http://localhost:PORT_APP
