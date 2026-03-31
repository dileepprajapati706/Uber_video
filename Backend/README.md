# Backend API Documentation

## `POST /users/register`

Register a new user account.

### Description
Creates a new user with a full name, email, and password. The password is stored as a hashed value and a JSON Web Token (JWT) is returned for authentication.

### Request
- URL: `/users/register`
- Method: `POST`
- Content-Type: `application/json`

#### Body parameters
- `fullname` (object, required)
  - `firstname` (string, required) - minimum 3 characters
  - `lastname` (string, optional) - minimum 3 characters if provided
- `email` (string, required) - must be a valid email format
- `password` (string, required) - minimum 6 characters

#### Example request body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "strongPassword123"
}
```

### Responses

#### `201 Created`
User created successfully.

Example response:
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### `400 Bad Request`
Validation failed or required fields are missing.

Example response:
```json
{
  "errors": [
    {
      "msg": "invalid Email !",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### `500 Internal Server Error`
Unexpected server error.

Example response:
```json
{
  "message": "Internal Server Error"
}
```

## `POST /users/login`

Authenticate an existing user and return a JSON Web Token.

### Description
Validates user credentials and returns an authentication token along with user details.

### Request
- URL: `/users/login`
- Method: `POST`
- Content-Type: `application/json`

#### Body parameters
- `email` (string, required) - must be a valid email format
- `password` (string, required) - minimum 6 characters

#### Example request body
```json
{
  "email": "john.doe@example.com",
  "password": "strongPassword123"
}
```

### Responses

#### `200 OK`
Login successful.

Example response:
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### `400 Bad Request`
Validation failed or required fields are missing.

Example response:
```json
{
  "errors": [
    {
      "msg": "invalid Email !",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### `401 Unauthorized`
Invalid email or password.

Example response:
```json
{
  "message": "invalid email or password"
}
```

## `GET /users/profile`

Retrieve the authenticated user's profile.

### Description
Returns the current user's profile information after validating the JWT token from `Authorization` header or cookie.

### Request
- URL: `/users/profile`
- Method: `GET`
- Headers:
  - `Authorization: Bearer <jwt-token>`
  - or cookie: `token=<jwt-token>`

### Responses

#### `200 OK`
Profile retrieved successfully.

Example response:
```json
{
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### `401 Unauthorized`
Missing or invalid authentication token.

Example response:
```json
{
  "message": "Unauthorizes"
}
```

#### `401 Unauthorized`
User not found or token is invalid.

Example response:
```json
{
  "message": "Unauthorizes user"
}
```
