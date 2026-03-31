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
