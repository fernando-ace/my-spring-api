# TaskFlow

> **Effortless productivity, engineered for the modern web.**

---

## Overview

**TaskFlow** is a modern, full-stack task management application that demonstrates best practices in scalable software engineering. It features a robust Java Spring Boot backend and a sleek React + Tailwind CSS frontend, all powered by a PostgreSQL database. TaskFlow is designed for easy local development, clean architecture, and a seamless user experience.

---

## Features

- **Full CRUD Task Management:** Create, read, update, and delete tasks with instant feedback.
- **Modern UI/UX:** Responsive, accessible, and visually appealing interface using React and Tailwind CSS.
- **RESTful API:** Well-structured endpoints following REST conventions.
- **State Management:** Efficient use of React hooks for local state and UI updates.
- **Cross-Origin Support:** Secure CORS configuration for local and cloud development.
- **Database:** PostgreSQL for persistent storage, managed via Docker.
- **Security Best Practices:** Configurable security with Spring Security.
- **Component-Based Architecture:** Modular frontend and backend code for maintainability.
- **Easy Local Setup:** Minimal configuration required to run locally.

---

## Technology Stack

### Backend

- **Language:** Java 17
- **Framework:** Spring Boot 3
- **ORM:** Spring Data JPA (Hibernate)
- **Security:** Spring Security
- **Database:** PostgreSQL (via Docker)
- **Build Tool:** Maven
- **Other:** JWT (io.jsonwebtoken), WebSocket-ready, Lombok

### Frontend

- **Language:** JavaScript (ES6+)
- **Framework:** React 19
- **Styling:** Tailwind CSS 3, PostCSS, autoprefixer
- **Testing:** React Testing Library, Jest
- **Build Tool:** Create React App

---

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- Maven 3.8+
- Docker

---

### 1. Set Up PostgreSQL with Docker

**Start PostgreSQL in Docker:**

```sh
docker run --name my-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=mydatabase \
  -p 5432:5432 \
  -d postgres:16
```

**Update the backend configuration** in `src/main/resources/application.properties` if you need to change credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mydatabase
spring.datasource.username=postgres
spring.datasource.password=yourpassword
```

> **Note:** If you are running TaskFlow in a Codespace or cloud environment, you may need to set the backend (8080) and/or database (5432) ports to public in your environment settings to allow external access from the frontend or your local machine.

---

### 2. Start the Backend

```sh
./mvnw spring-boot:run
```

The backend will be available at [http://localhost:8080](http://localhost:8080).

---

### 3. Start the Frontend

```sh
cd frontend
npm install
npm start
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## Example Usage

- **Add a Task:** Enter a title and click "Add Task".
- **Edit/Delete:** Use the edit and delete buttons next to each task.
- **Mark Complete:** Check the box to mark a task as done.

---

## Architecture

- **REST API:** All task operations are exposed via `/api/tasks` endpoints.
- **Entity Modeling:** JPA entity (`Task`) with repository pattern for clean data access.
- **Frontend State:** React hooks (`useState`, `useEffect`) for local state and side effects.
- **CORS & Security:** Fine-tuned CORS and open security for development.
- **Componentization:** Dedicated components for forms, lists, and layout.

---

## Testing

- **Backend:** `mvn test` for unit/integration tests.
- **Frontend:** `npm test` for React component tests.

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss your ideas.

---

## Contact

**Fernando (Project Author)**  
[LinkedIn](https://www.linkedin.com/in/fernando-ace/)  
[GitHub](https://github.com/fernando-ace)  
Email: FernandoJosueAcevedo@gmail.com

---

> **Ready to see clean code and modern engineering in action? Clone TaskFlow, try it out, or get in touch to discuss software engineering opportunities!**

---

## Configuration for Any Environment

To make TaskFlow work in any local, Codespaces, or cloud environment, configure the frontend and backend URLs as follows:

### Frontend
1. Copy `frontend/.env.example` to `frontend/.env`.
2. Set `REACT_APP_API_BASE_URL` to your backend URL:
   - For local: `http://localhost:8080/api`
   - For Codespaces: `https://<your-codespace-id>-8080.app.github.dev/api`

### Backend
1. Edit `src/main/resources/application.properties`.
2. Set `app.cors.allowed-origins` to your frontend URL(s), comma-separated if multiple:
   - For local: `http://localhost:3000`
   - For Codespaces: `https://<your-codespace-id>-3000.app.github.dev`

> This allows anyone to run TaskFlow in their own environment without code changes—just update the environment variables and properties!
