# Sistema de Gestão para Clínica Médica

Sistema full stack para gerenciamento de médicos, pacientes e consultas.

## Tecnologias Utilizadas

### Backend

* Java 21
* Spring Boot
* Spring Data JPA
* H2 Database
* Maven

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

---

## Funcionalidades

### Médicos

* Cadastro de médicos
* Listagem de médicos
* Busca por ID
* Atualização de cadastro
* Remoção de médicos

### Pacientes

* Cadastro de pacientes
* Listagem de pacientes
* Busca por ID
* Atualização de cadastro
* Remoção de pacientes

### Consultas

* Agendamento de consultas
* Listagem de consultas
* Busca por ID
* Atualização de consultas
* Cancelamento de consultas

---

## Executando o Projeto

### Backend

Entre na pasta:

```bash
cd backendConsultorio
```

Execute a aplicação:

```bash
./mvnw spring-boot:run
```

Ou no Windows:

```bash
mvnw.cmd spring-boot:run
```

A API estará disponível em:

```text
http://localhost:8080
```

---

### Banco de Dados H2

Acesse:

```text
http://localhost:8080/h2-console
```

Configuração recomendada:

```properties
spring.datasource.url=jdbc:h2:mem:consultoriodb
spring.h2.console.enabled=true
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```

---

### Frontend

Na raiz do projeto execute:

```bash
npm install
```

Depois:

```bash
npm run dev
```

O frontend ficará disponível em:

```text
http://localhost:3000
```

---

## Endpoints da API

### Médicos

| Método | Endpoint      |
| ------ | ------------- |
| POST   | /medicos      |
| GET    | /medicos      |
| GET    | /medicos/{id} |
| PUT    | /medicos/{id} |
| DELETE | /medicos/{id} |

### Exemplo

```json
{
  "cpf": "12345678901",
  "nome": "Dr. João Silva",
  "email": "joao@clinica.com",
  "senha": "senha123",
  "crm": "CRM/MG 12345"
}
```

---

### Pacientes

| Método | Endpoint        |
| ------ | --------------- |
| POST   | /pacientes      |
| GET    | /pacientes      |
| GET    | /pacientes/{id} |
| PUT    | /pacientes/{id} |
| DELETE | /pacientes/{id} |

### Exemplo

```json
{
  "cpf": "98765432100",
  "nome": "Maria Souza",
  "email": "maria@email.com",
  "senha": "senha123"
}
```

---

### Consultas

| Método | Endpoint        |
| ------ | --------------- |
| POST   | /consultas      |
| GET    | /consultas      |
| GET    | /consultas/{id} |
| PUT    | /consultas/{id} |
| DELETE | /consultas/{id} |

### Exemplo

```json
{
  "paciente": {
    "id": 1
  },
  "medico": {
    "id": 1
  },
  "horaData": "2025-08-15T14:30:00",
  "sala": "Sala 3"
}
```

---

## Regras de Negócio

* CPF obrigatório para médicos e pacientes
* Nome obrigatório para médicos e pacientes
* E-mail obrigatório para médicos e pacientes
* Senha obrigatória para médicos e pacientes
* CPF único por entidade
* E-mail único por entidade
* CRM obrigatório e único para médicos
* Consulta exige médico, paciente, data/hora e sala
* Não é permitido agendar dois atendimentos para o mesmo médico no mesmo horário
* Não é permitido agendar duas consultas na mesma sala no mesmo horário
* Atualizações ignoram a própria consulta na validação de conflito

---

## Estrutura do Projeto

```text
consultorio/
│
├── backendConsultorio/
│   ├── controller/
│   ├── entity/
│   ├── repository/
│   ├── service/
│   └── resources/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
│
├── package.json
└── README.md
```

---

## Melhorias Futuras

* Implementar autenticação JWT
* Implementar Spring Security
* Criar DTOs para respostas da API
* Ocultar campo de senha nas respostas
* Implementar paginação
* Criar tratamento global de exceções
* Adicionar testes unitários
* Adicionar testes de integração
* Implementar documentação com Swagger/OpenAPI

---

## Autor

Gustavo Ryan Xavier

Portifólio: https://portifolio-gustavo-ryan.vercel.app/
