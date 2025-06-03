# LibrosAPI

## Architecture Overview

LibrosAPI is a .NET 8 RESTful API designed with a clean, maintainable, and testable layered architecture. The solution is split into the following projects:

- **Domain**: Contains core domain models and DbContext configuration.
- **Repos**: Implements the Repository pattern for data access abstraction.
- **Services**: Contains business logic and service layer, including validation.
- **LibrosAPI**: The API layer, controllers, authentication, middleware, and configuration.
- **LibroServiceTests**: Unit tests for the service layer.

## Key Patterns and Good Practices

### 1. Layered Architecture
- **Separation of Concerns**: Each layer (Domain, Repository, Service, API) has a clear responsibility.
- **Dependency Injection**: All dependencies are injected, promoting testability and loose coupling.

### 2. Repository Pattern
- **Generic Repository**: `Repository<T>` provides reusable CRUD operations for any entity.
- **Specific Repository**: `LibroRepository` for Libro-specific data access, implementing `ILibroRepository`.

### 3. Service Layer
- **Business Logic**: All business rules and validation are handled in the service layer (`LibroService`).
- **Validation**: Uses FluentValidation for model validation, ensuring clean and maintainable validation logic.

### 4. API Layer
- **RESTful Controllers**: Controllers use proper HTTP status codes and return types.
- **JWT Authentication**: Secure endpoints with JWT Bearer tokens, integrated with Swagger UI for easy testing.
- **Global Exception Handling**: Custom middleware catches and formats all unhandled exceptions and validation errors into consistent JSON responses.
- **CORS Policy**: Global CORS policy allows cross-origin requests for easy frontend integration.

### 5. Testing
- **Unit Tests**: Service layer is covered by unit tests using xUnit and Moq, ensuring business logic correctness.

## How to Use
1. **Run the API**: The API uses an in-memory database and seeds sample data on startup.
2. **Authenticate**: Use `/api/auth/login` to obtain a JWT token (default user: `admin`/`password`).
3. **Authorize in Swagger**: Click "Authorize" in Swagger UI and paste the token as `Bearer {token}`.
4. **Access Endpoints**: All Libro endpoints require authentication.

## Summary of Good Practices
- SOLID principles throughout all layers.
- DRY and KISS principles in code structure and logic.
- Consistent use of dependency injection.
- Clean separation of concerns.
- Secure, testable, and maintainable codebase.

---

Feel free to extend the solution with new features, entities, or validation rules following the same patterns and practices.
