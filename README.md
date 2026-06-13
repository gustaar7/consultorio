# Consultório API

API REST para gerenciamento de consultas médicas, desenvolvida com Spring Boot 4.1 e Java 21.

## Tecnologias

- Java 21
- Spring Boot 4.1
- Spring Data JPA
- Spring Validation
- H2 Database (em memória)
- Lombok
- Maven

## Estrutura do Projeto

```
src/main/java/com/gustavo/consultorio/
├── controller/
│   ├── ConsultaController.java
│   ├── MedicoController.java
│   └── PacienteController.java
├── entity/
│   ├── PessoaEntity.java       ← superclasse abstrata (cpf, nome, email, senha)
│   ├── MedicoEntity.java       ← extends PessoaEntity + crm único
│   ├── PacienteEntity.java     ← extends PessoaEntity
│   └── ConsultaEntity.java     ← @ManyToOne para Medico e Paciente
├── repository/
│   ├── ConsultaRepository.java ← queries de conflito com AndIdNot para update
│   ├── MedicoRepository.java
│   └── PacienteRepository.java
└── service/
    ├── ConsultaService.java    ← validação de conflitos (create e update)
    ├── MedicoService.java
    └── PacienteService.java
```

## Como Rodar

### Pré-requisitos

- Java 21+
- Maven (ou use o `mvnw` incluído)

### Rodando a aplicação

```bash
./mvnw spring-boot:run
```

A aplicação sobe em `http://localhost:8080`.

### H2 Console

Acesse o banco em memória via browser em `http://localhost:8080/h2-console`.

Adicionar em `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:h2:mem:consultoriodb
spring.h2.console.enabled=true
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```

## Endpoints

### Médicos `/medicos`

| Método | Rota            | Descrição          |
|--------|-----------------|--------------------|
| POST   | `/medicos`      | Cadastrar médico   |
| GET    | `/medicos`      | Listar todos       |
| GET    | `/medicos/{id}` | Buscar por ID      |
| PUT    | `/medicos/{id}` | Atualizar médico   |
| DELETE | `/medicos/{id}` | Remover médico     |

**Exemplo de body (POST/PUT):**
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

### Pacientes `/pacientes`

| Método | Rota              | Descrição            |
|--------|-------------------|----------------------|
| POST   | `/pacientes`      | Cadastrar paciente   |
| GET    | `/pacientes`      | Listar todos         |
| GET    | `/pacientes/{id}` | Buscar por ID        |
| PUT    | `/pacientes/{id}` | Atualizar paciente   |
| DELETE | `/pacientes/{id}` | Remover paciente     |

**Exemplo de body (POST/PUT):**
```json
{
  "cpf": "98765432100",
  "nome": "Maria Souza",
  "email": "maria@email.com",
  "senha": "senha123"
}
```

---

### Consultas `/consultas`

| Método | Rota              | Descrição            |
|--------|-------------------|----------------------|
| POST   | `/consultas`      | Agendar consulta     |
| GET    | `/consultas`      | Listar todas         |
| GET    | `/consultas/{id}` | Buscar por ID        |
| PUT    | `/consultas/{id}` | Atualizar consulta   |
| DELETE | `/consultas/{id}` | Cancelar consulta    |

**Exemplo de body (POST/PUT):**
```json
{
  "paciente": { "id": 1 },
  "medico":   { "id": 1 },
  "horaData": "2025-08-15T14:30:00",
  "sala": "Sala 3"
}
```

> O sistema valida conflitos de horário tanto na criação quanto na atualização:
> não permite dois agendamentos para o mesmo médico ou mesma sala no mesmo horário.

## Regras de Negócio

- CPF, nome, e-mail e senha são obrigatórios para médico e paciente
- CPF e e-mail são únicos por entidade
- CRM é obrigatório e único para médicos
- Consulta exige paciente, médico, data/hora e sala
- Nenhum médico pode ter duas consultas no mesmo horário
- Nenhuma sala pode ter duas consultas no mesmo horário
- A verificação de conflito na atualização ignora a própria consulta (usando `AndIdNot`)

## Pendências / Melhorias Futuras

- [ ] Corrigir `pom.xml` — artifact IDs inválidos: `spring-boot-h2console`, `spring-boot-starter-webmvc`, `spring-boot-starter-data-jpa-test` e `spring-boot-starter-webmvc-test` não existem; os corretos são `spring-boot-starter-web` e `spring-boot-starter-test`
- [ ] `MedicoController` e `PacienteController` chamam o repository diretamente — deveriam usar `MedicoService` e `PacienteService`
- [ ] `@PathVariable` faltando em `listMedicosId` (`MedicoController`) e `listaByIdPacientes` (`PacienteController`)
- [ ] `PacienteEntity` sem anotações Lombok (`@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor`)
- [ ] Criar DTOs para não expor o campo `senha` nos responses
- [ ] Tratamento global de exceções com `@RestControllerAdvice` (hoje erros retornam 500 genérico)
- [ ] Paginação nas listagens (`Pageable`)
- [ ] Autenticação com Spring Security + JWT
- [ ] Testes unitários (JUnit 5 + Mockito) e de integração
