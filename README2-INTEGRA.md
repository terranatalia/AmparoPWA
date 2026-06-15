# Relatório de Integração & Guia de Configuração (Fullstack)
Este documento descreve como foi realizada a integração entre o Front-end (React Web/PWA via Vite) e o Back-end (Node.js + Express + TypeScript + Sequelize + MariaDB), além dos passos necessários para rodar e testar o ecossistema localmente.


## Relatório Técnico da Integração

  

### 1.  **Configuração do Cliente HTTP (Front-end):**

* Foi criado um serviço centralizado utilizando a biblioteca **Axios** em `frontend/src/services/api.ts`.

* A `baseURL` foi mapeada para apontar diretamente para a porta do servidor local do Back-end (`http://localhost:5000`).

  

### 2.  **Resolução de Conflitos e Infraestrutura:**

*  **Banco de Dados:** Corrigido o erro crítico de banco ausente (`ER_BAD_DB_ERROR`) através da criação manual do Schema `db_amparo` via MariaDB.

* **Sincronização de Tabelas:** O ORM (Sequelize) no Back-end realizou o mapeamento automático estruturando as tabelas (`pais`, `estado`, `cidade`, `logadouro`, `usuario`, `contato_emergencia`, `mensagem`, `alerta`).

*  **Liberação de Portas:** Resolvido o travamento de processo em segundo plano (`EADDRINUSE`) que ocupava a porta `5000`.

* **Normalização:** As páginas do front foram revisadas e reajustadas às novas configurações.


.
.
.
  

## Como Configurar e Rodar para Testes

  

Para testar a aplicação na sua máquina local, siga o passo a passo abaixo divididos em três etapas essenciais: Banco de Dados, Back-end e Front-end.

  

### 1. Pré-requisitos (Banco de Dados)

Certifique-se de ter o **MariaDB** (ou MySQL) rodando localmente na porta padrão `3306`.

1. Abra seu gerenciador de banco de dados de preferência (ex: DBeaver, MySQL Workbench).

2. Conecte-se ao seu servidor local e execute a query abaixo para criar o banco de dados:

```sql

CREATE  DATABASE db_amparo;
```


### 2. Iniciando o Back-end
O back gerencia as regras de negócio e o acesso ao banco de dados na porta 5000.

1. Abra o terminal (bash) na pasta raiz do backend (/backend)

2. Instale as dependências necessárias do Node:
```bash
npm install
```
3. Inicialize o servidor em modo de desenvolvimento:

```bash
npm start
```
*Verifique se a última linha do terminal exibirá:* `Servidor online na porta 5000!`

### 3. Inicializando o Front-end (PWA/Vite)
O front roda na porta padrão do Vite (5173) e consome os dados do servidor.
1. Abra um segundo terminal separado, agora na pasta raiz do front-end (`/frontend`).
2. Certifique-se de que o arquivo `src/services/api.ts` está configurado corretamente:

``` Typescript
import axios from 'axios';
    const api = axios.create({
      baseURL: 'http://localhost:5000',
      timeout: 10000,
    });
    export default api;
```
   3. Inicialize o servidor do Vite:

```bash
npm run dev
```
4. Abra o seu navegador no endereço fornecido pelo terminal (geralmente `http://localhost:5173`).

.
.
.

## Como Testar os Endpoints de Integração

Para validar se os dois lados estão conversando, você pode injetar dados fictícios no banco usando o DBeaver ou fazer requisições diretamente nas páginas criadas (como a `ContactsPage.jsx`).

**Exemplo de consumo interno de dados via Axios:**
```Javascript
    import api from '../services/api';
    
    // Buscando os contatos de emergência do Banco através da API
    api.get('/contato_emergencia')
      .then(response => console.log("Dados integrados com sucesso:", response.data))
      .catch(error => console.error("Erro na comunicação entre os ambientes:", error));
 ```
