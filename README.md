# Libros Fullstack Application

This repository contains both the backend API (LibrosAPI) and the frontend React application (libro-ui-app) for managing books. The solution is designed for scalability, maintainability, and ease of local development.

---

## How to Run Locally

### 1. Backend API (LibrosAPI)

- **Requirements:** .NET 8 SDK
- **Setup & Run:**
  1. Open a terminal and navigate to the backend folder: ```sh
     cd LibrosAPI
 ```  2. Restore dependencies and run the API: ```sh
 dotnet restore
 dotnet run
 ```  3. The API will start (by default on `https://localhost:5001` or `http://localhost:5000`).
  4. Access Swagger UI at `/swagger` for interactive API documentation and testing.

- **Authentication:**
  - Use the `/api/auth/login` endpoint with:
    - Username: `admin`
    - Password: `password`
  - Copy the returned JWT token and use the "Authorize" button in Swagger UI to authenticate.

---

### 2. Frontend App (libro-ui-app)

- **Requirements:** Node.js (v16+ recommended), npm
- **Setup & Run:**
  1. Open a new terminal and navigate to the frontend folder: ```sh
 cd libro-ui-app/libro-ui-app
 ```  2. Install dependencies: ```sh
     npm install
 ```  3. Start the development server: ```sh
 npm start
 ```  4. The app will run on `http://localhost:3000` by default.

- **Configuration:**
  - Ensure the frontend is configured to use the backend API URL (e.g., in an `.env` file: `REACT_APP_API_URL=http://localhost:5000`).

---

## Backend Architecture & Good Practices

- **Layered Architecture:** Domain, Repository, Service, and API layers for separation of concerns.
- **Repository Pattern:** Generic and specific repositories for data access abstraction.
- **Service Layer:** All business logic and validation (with FluentValidation) is handled here.
- **RESTful Controllers:** Proper HTTP status codes and return types.
- **JWT Authentication:** Secure endpoints, integrated with Swagger UI.
- **Global Exception Handling:** Middleware for consistent error responses.
- **CORS Policy:** Global CORS enabled for frontend-backend integration.
- **Unit Testing:** Service layer covered by xUnit and Moq.
- **SOLID, DRY, KISS:** Principles applied throughout.

---

## Frontend Architecture & Good Practices

- **Component-Based Architecture:** Small, reusable React components for modularity.
- **Context API for State Management:** `AuthProvider` and `NotificationProvider` manage global state.
- **Separation of Concerns:**
  - **Components:** UI rendering.
  - **Services:** API calls and business logic.
  - **Models:** Data object structure.
  - **Utilities:** Helper functions.
- **CSS Modules:** Scoped styles to avoid conflicts.
- **Error Handling:** API calls include error handling for graceful failures.
- **Code Quality:**
  - Meaningful names, comments, consistent formatting, and linting.
- **Testing:** Unit tests for components and utilities.

---

## Future Improvements
- Implement more comprehensive unit and integration tests (frontend & backend).
- Add support for internationalization (i18n) in the frontend.
- Optimize performance for large datasets.
- Extend API and UI features as needed.

