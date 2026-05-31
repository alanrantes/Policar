# 🚗 PoliCar | React + ASP.NET Core + SQL Server

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=flat&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=flat&logo=c-sharp&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=flat&logo=microsoftsqlserver&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)

<p align="justify">
Sistema web desenvolvido para gerenciamento e agendamento de serviços de estética automotiva, permitindo que clientes realizem solicitações de atendimento online e acompanhem os serviços oferecidos pela oficina.
</p>

<p align="justify">
A aplicação possui frontend desenvolvido em React e uma API REST construída com C# e ASP.NET Core, utilizando SQL Server para persistência dos dados e Swagger para documentação e testes dos endpoints.
</p>

---

## 🚀 Funcionalidades

### 👥 Área do Cliente

- Visualização dos serviços oferecidos
- Portfólio de serviços realizados
- Solicitação de agendamento online
- Seleção de data e horário disponíveis
- Interface responsiva
- Alternância entre tema claro e escuro

### 🛠️ Área Administrativa

- Dashboard de acompanhamento
- Listagem de agendamentos
- Busca e filtros
- Alteração de status dos atendimentos
- Gerenciamento de solicitações
- Visualização de serviços confirmados

### 🔄 Integração Frontend e Backend

- Consumo de API REST
- Operações CRUD de agendamentos
- Persistência de dados em SQL Server
- Documentação e testes via Swagger

## 📂 Estrutura do Projeto

```text
Policar
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── data
│   │   ├── assets
│   │   └── styles
│
└── backend
    └── Policar.Api
```

### Frontend

- React
- JavaScript
- CSS3
- Vite
- Lucide React

### Backend

- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQL Server
- Swagger (OpenAPI)

### Controle de Versão

- Git
- GitHub
---

## 🚀 Como Executar o Projeto

### Frontend

```bash
cd frontend

npm install

npm run dev
```
### Backend

```bash
cd backend

cd Policar.Api

dotnet run
```

A aplicação será iniciada em:

```text
http://localhost:5173
```

---

## 📸 Demonstração

### Página Inicial

![Home](screenshots/home.png)

### Agendamento Online

![Agendamento](screenshots/agendamento.png)

### Painel Administrativo

![Admin](screenshots/admin.png)
![Admin](screenshots/admin2.png)

## 📑 Apresentação Completa

[Visualizar PDF](./apresentação/PoliCar_Telas.pdf)

---

## 🎯 Objetivo
<p align="justify">Este projeto foi desenvolvido para praticar conceitos de desenvolvimento full stack, utilizando React no frontend e ASP.NET Core no backend. Durante o desenvolvimento foram aplicados conceitos de componentização, gerenciamento de estado, consumo de APIs REST, persistência de dados com SQL Server, documentação de endpoints com Swagger e organização de código em camadas.</p>
