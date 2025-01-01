# Backend API Documentation

## Endpoint: `/api/users/register`

### Method: POST

### Description
This endpoint is used to register a new user in the system. It validates the user input, checks for existing users, hashes the password, and saves the new user to the database.

### Request Body
The request body must be a JSON object containing the following fields:

- `email` (string): The user's email address. Must be a valid email format.
- `firstname` (string): The user's first name. Must be at least 3 characters long.
- `lastname` (string): The user's last name. Must be at least 3 characters long.
- `password` (string): The user's password. Must be at least 6 characters long.

### Example Request
```json
{
    "email": "user@example.com",
    "firstname": "John",
    "lastname": "Doe",
    "password": "password123"
}
```

### Response
The response will be a JSON object containing the following fields:

- `success` (boolean): Indicates whether the registration was successful.
- `message` (string): A message describing the result of the registration.
- `token` (string, optional): The authentication token for the newly registered user (only if registration is successful).
- `newUser` (object, optional): The newly registered user object (only if registration is successful).

### Example Successful Response
```json
{
    "success": true,
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "newUser": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "user@example.com"
    }
}
```

### Example Error Response
```json
{
    "success": false,
    "message": "User already exists"
}
```

### Validation Errors
If the input validation fails, the response will contain an array of error messages.

### Example Validation Error Response
```json
{
    "errors": [
        {
            "msg": "Express-Validator::Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Express-Validator::First name must be at least 3 characters long",
            "param": "firstname",
            "location": "body"
        }
    ]
}
```

## Endpoint: `/api/users/login`

### Method: POST

### Description
This endpoint authenticates an existing user. It validates the provided credentials, checks the password hash, and returns an authentication token upon successful login.

### Request Body
The request body must be a JSON object containing the following fields:

- `email` (string): The user's email address. Must be a valid email format.
- `password` (string): The user's password. Must be at least 6 characters long.

### Example Request
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

### Response
The response will be a JSON object containing the following fields:

- `success` (boolean): Indicates whether the login was successful.
- `message` (string): A message describing the result of the login attempt.
- `token` (string, optional): The authentication token (only if login is successful).
- `user` (object, optional): The user object (only if login is successful).

### Example Successful Response
```json
{
    "success": true,
    "message": "User logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "user@example.com"
    }
}
```

### Example Error Response
```json
{
    "success": false,
    "message": "Invalid Email or Password!"
}
```

### Validation Errors
If the input validation fails, the response will contain an array of error messages.

### Example Validation Error Response
```json
{
    "errors": [
        {
            "msg": "Express-Validator::Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Express-Validator::Password must be at least 6 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

### Error Cases
- Invalid email format
- Password too short
- User not found
- Incorrect password
- Server error

## Endpoint: `/api/users/profile`

### Method: GET

### Description
This endpoint retrieves the authenticated user's profile information. Requires authentication token.

### Authentication
Required in one of these formats:
- Cookie: `token=<jwt_token>`
- Header: `Authorization: Bearer <jwt_token>`

### Response
The response will be a JSON object containing:

- `success` (boolean): Indicates whether the profile fetch was successful.
- `message` (string): A message describing the result.
- `user` (object): The user's profile information.

### Example Successful Response
```json
{
    "success": true,
    "message": "User profile fetched successfully",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "user@example.com"
    }
}
```

### Example Error Response
```json
{
    "success": false,
    "error": "Unauthorized access"
}
```

## Endpoint: `/api/users/logout`

### Method: GET

### Description
This endpoint logs out the current user by invalidating their authentication token and adding it to a blacklist.

### Authentication
Required in one of these formats:
- Cookie: `token=<jwt_token>`
- Header: `Authorization: Bearer <jwt_token>`

### Response
The response will be a JSON object containing:

- `success` (boolean): Indicates whether the logout was successful.
- `message` (string): A message describing the result.

### Example Successful Response
```json
{
    "success": true,
    "message": "User logged out successfully"
}
```

### Example Error Response
```json
{
    "success": false,
    "error": "Unauthorized access"
}
```

### Side Effects
- Clears the authentication cookie if present
- Adds the token to blacklist (expires after 24 hours)
- Invalidates the current session







