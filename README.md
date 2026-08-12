# User Management REST API

## Overview
This is a RESTful API built with Node.js and Express for managing a list of users. The API implements CRUD operations with logging middleware, input validation, and comprehensive error handling.

Markdown
## 📄 Documentation & API Testing

An **API Testing Documentation Report** has been included in the root directory:
- **File Name:** `API_Testing_Documentation.pdf` (or `Final_API_Testing_Report.pdf`)
- **Details:** Contains API test execution details, HTTP status codes breakdown, valid





## Requirements Met

### 1. Project Initialization (5 marks)
- ✅ Node.js project initialized with `package.json`
- ✅ Express installed and configured

### 2. REST API Routes (25 marks)
- ✅ `GET /users` - Fetch all users
- ✅ `GET /users/:id` - Fetch user by ID
- ✅ `POST /user` - Create new user
- ✅ `PUT /user/:id` - Update user
- ✅ `DELETE /user/:id` - Delete user

### 3. User Object Structure (Sample)
```json
{
  "id": "1",
  "firstName": "Anshika",
  "lastName": "Agarwal",
  "hobby": "Teaching"
}
```

### 4. Middleware (30 marks)
- ✅ **Request Logging Middleware** (15 marks)
  - Logs HTTP method, URL, and response status code for every request
  - Includes timestamp for each logged request

- ✅ **Validation Middleware** (15 marks)
  - Validates required fields: `firstName`, `lastName`, `hobby`
  - Checks for empty/whitespace-only values
  - Returns 400 Bad Request with detailed error messages on validation failure
  - Applied to both POST and PUT routes

### 5. Error Handling (10 marks)
- ✅ Appropriate HTTP status codes:
  - `200 OK` - Successful GET/PUT/DELETE
  - `201 Created` - Successful POST
  - `400 Bad Request` - Validation error
  - `404 Not Found` - Resource not found
  - `500 Internal Server Error` - Server error

- ✅ Meaningful error messages for:
  - User not found
  - Missing/invalid input fields
  - Server errors

### 6. Data Storage
- ✅ In-memory array storage for simplicity
- ✅ Pre-populated with 3 sample users

### 7. Code Quality (5 marks)
- ✅ Clear comments explaining all logic and middleware

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Navigate to project directory**
   ```bash
   cd express-rest-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Server output**
   ```
   User Management REST API

   Server is running on http://localhost:3000

   Available Endpoints:
   • GET    /users          - Get all users
   • GET    /users/:id      - Get user by ID
   • POST   /user           - Create new user
   • PUT    /user/:id       - Update user
   • DELETE /user/:id       - Delete user
   ```

## API Endpoints

### 1. GET /users
Fetch all users from the list.

**Request:**
```
GET http://localhost:3000/users
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "count": 3,
  "data": [
    {
      "id": "1",
      "firstName": "Anshika",
      "lastName": "Agarwal",
      "hobby": "Teaching"
    },
    ...
  ]
}
```

---

### 2. GET /users/:id
Fetch details of a specific user.

**Request:**
```
GET http://localhost:3000/users/1
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "1",
    "firstName": "Anshika",
    "lastName": "Agarwal",
    "hobby": "Teaching"
  }
}
```

**Response (404 Not Found):**
```json
{
  "error": "Not Found",
  "message": "User with ID 999 not found"
}
```

---

### 3. POST /user
Create a new user.

**Request:**
```
POST http://localhost:3000/user
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "hobby": "Coding"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "4",
    "firstName": "John",
    "lastName": "Doe",
    "hobby": "Coding"
  }
}
```

**Response (400 Bad Request - Missing field):**
```json
{
  "error": "Validation Error",
  "message": "All fields (firstName, lastName, hobby) are required and must not be empty",
  "receivedFields": {
    "firstName": "missing",
    "lastName": "provided",
    "hobby": "provided"
  }
}
```

---

### 4. PUT /user/:id
Update an existing user.

**Request:**
```
PUT http://localhost:3000/user/1
Content-Type: application/json

{
  "firstName": "Anshika",
  "lastName": "Agarwal",
  "hobby": "Research"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "1",
    "firstName": "Anshika",
    "lastName": "Agarwal",
    "hobby": "Research"
  }
}
```

**Response (404 Not Found):**
```json
{
  "error": "Not Found",
  "message": "User with ID 999 not found"
}
```

---

### 5. DELETE /user/:id
Delete a user.

**Request:**
```
DELETE http://localhost:3000/user/2
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": "2",
    "firstName": "Raj",
    "lastName": "Kumar",
    "hobby": "Reading"
  }
}
```

**Response (404 Not Found):**
```json
{
  "error": "Not Found",
  "message": "User with ID 999 not found"
}
```

---

## Testing the API

### Using Postman or Thunder Client

1. Import the requests using the examples above
2. Set the base URL to `http://localhost:3000`
3. Test each endpoint with the provided request/response examples

### Sample Test Scenarios

#### 1. Get All Users
- Method: GET
- URL: `http://localhost:3000/users`
- Expected: 200 OK with list of users

#### 2. Get Specific User
- Method: GET
- URL: `http://localhost:3000/users/1`
- Expected: 200 OK with user data

#### 3. Create User (Valid)
- Method: POST
- URL: `http://localhost:3000/user`
- Body: `{"firstName": "Alice", "lastName": "Johnson", "hobby": "Gaming"}`
- Expected: 201 Created with new user ID

#### 4. Create User (Invalid - Missing Field)
- Method: POST
- URL: `http://localhost:3000/user`
- Body: `{"firstName": "Bob", "hobby": "Sports"}`
- Expected: 400 Bad Request with validation error

#### 5. Update User
- Method: PUT
- URL: `http://localhost:3000/user/1`
- Body: `{"firstName": "Anshika", "lastName": "Agarwal", "hobby": "Research"}`
- Expected: 200 OK with updated data

#### 6. Update Non-existent User
- Method: PUT
- URL: `http://localhost:3000/user/999`
- Body: `{"firstName": "Test", "lastName": "User", "hobby": "Testing"}`
- Expected: 404 Not Found

#### 7. Delete User
- Method: DELETE
- URL: `http://localhost:3000/user/1`
- Expected: 200 OK with deleted user data

#### 8. Delete Non-existent User
- Method: DELETE
- URL: `http://localhost:3000/user/999`
- Expected: 404 Not Found

## Middleware Implementation

### 1. Request Logging Middleware
Logs every incoming request with:
- Timestamp
- HTTP Method (GET, POST, PUT, DELETE)
- Request URL
- Response Status Code

Output example:
```
[10:30:45 AM] GET /users - Status: 200
[10:30:50 AM] POST /user - Status: 201
[10:30:55 AM] DELETE /user/1 - Status: 200
```

### 2. Validation Middleware
Applied to POST and PUT routes. Validates:
- All required fields are present
- Fields are not empty or whitespace-only
- Fields are of correct type (string)

Returns 400 Bad Request with detailed error information if validation fails.

## Code Structure

- **server.js** - Main server file with all routes, middleware, and logic

### Key Sections:
1. **Middleware Setup** - Express configuration and middleware
2. **In-Memory Data Storage** - Users array and ID counter
3. **Validation Middleware** - Input validation logic
4. **Routes** - All CRUD endpoints with detailed comments
5. **Error Handling** - Global error handler
6. **Server Start** - Port listening and startup message

## Features

✅ RESTful API design principles
✅ Comprehensive error handling
✅ Request/Response logging
✅ Input validation
✅ Clear code comments
✅ Proper HTTP status codes
✅ In-memory data persistence (during runtime)
✅ Pre-populated sample data

## Notes

- Data is stored in-memory and will be reset when the server restarts
- IDs are auto-generated starting from 4 (after the 3 sample users)
- All string fields are trimmed to remove leading/trailing whitespace
- The API is fully functional and ready for testing with Postman or Thunder Client

## License
ISC
