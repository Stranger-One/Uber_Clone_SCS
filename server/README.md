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

## Endpoint: `/api/captains/register`

### Method: POST

### Description
This endpoint registers a new captain (driver) in the system. It validates the input data, checks for existing captains, hashes the password, and saves the captain's information including vehicle details.

### Request Body
The request body must be a JSON object containing:

- `firstname` (string): Captain's first name. Min length: 3 characters.
- `lastname` (string): Captain's last name. Min length: 3 characters.
- `email` (string): Captain's email address. Must be unique and valid format.
- `password` (string): Captain's password. Min length: 6 characters.
- `vehicle` (object): Vehicle information containing:
  - `type` (string): Must be one of: 'car', 'motorcycle', 'auto'
  - `color` (string): Vehicle color. Min length: 3 characters.
  - `plate` (string): Vehicle plate number. Min length: 3 characters.
  - `capacity` (number): Vehicle passenger capacity. Min: 1

### Example Request
```json
{
    "firstname": "John",
    "lastname": "Smith",
    "email": "john.smith@example.com",
    "password": "password123",
    "vehicle": {
        "type": "car",
        "color": "black",
        "plate": "ABC123",
        "capacity": 4
    }
}
```

### Example Successful Response
```json
{
    "success": true,
    "message": "Captain registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Smith"
        },
        "email": "john.smith@example.com",
        "status": "inactive",
        "vehicle": {
            "type": "car",
            "color": "black",
            "plate": "ABC123",
            "capacity": 4
        }
    }
}
```

### Example Error Response
```json
{
    "success": false,
    "message": "Captain already exists"
}
```

### Example Validation Error Response
```json
{
    "errors": [
        {
            "msg": "Invalid value",
            "param": "vehicle.type",
            "location": "body"
        },
        {
            "msg": "Invalid value",
            "param": "vehicle.capacity",
            "location": "body"
        }
    ]
}
```

### Error Cases
- Invalid email format
- Password too short
- Invalid vehicle type
- Invalid vehicle capacity
- Captain already exists
- Missing required fields
- Server error

## Endpoint: `/api/captains/login`

### Method: POST

### Description
This endpoint authenticates an existing captain. It validates the credentials and returns an authentication token upon successful login.

### Request Body
The request body must be a JSON object containing:

- `email` (string): Captain's email address. Must be valid email format.
- `password` (string): Captain's password. Min length: 6 characters.

### Example Request
```json
{
    "email": "john.smith@example.com",
    "password": "password123"
}
```

### Example Successful Response
```json
{
    "success": true,
    "message": "Captain logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Smith"
        },
        "email": "john.smith@example.com",
        "status": "inactive",
        "vehicle": {
            "type": "car",
            "color": "black",
            "plate": "ABC123",
            "capacity": 4
        }
    }
}
```

### Example Error Response
```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

## Endpoint: `/api/captains/profile`

### Method: GET

### Description
This endpoint retrieves the authenticated captain's profile information.

### Authentication
Required in one of these formats:
- Cookie: `token=<jwt_token>`
- Header: `Authorization: Bearer <jwt_token>`

### Example Successful Response
```json
{
    "success": true,
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Smith"
        },
        "email": "john.smith@example.com",
        "status": "inactive",
        "vehicle": {
            "type": "car",
            "color": "black",
            "plate": "ABC123",
            "capacity": 4
        },
        "location": {
            "lat": null,
            "lng": null
        }
    }
}
```

### Example Error Response
```json
{
    "success": false,
    "error": "Unauthorized access :: No token provided"
}
```

## Endpoint: `/api/captains/logout`

### Method: GET

### Description
This endpoint logs out the current captain by invalidating their authentication token.

### Authentication
Required in one of these formats:
- Cookie: `token=<jwt_token>`
- Header: `Authorization: Bearer <jwt_token>`

### Example Successful Response
```json
{
    "success": true,
    "message": "Captain logged out successfully"
}
```

### Example Error Response
```json
{
    "success": false,
    "error": "Unauthorized access :: Token blacklisted"
}
```

### Side Effects
- Clears the authentication cookie
- Adds token to blacklist (expires after 24 hours)
- Sets captain status to 'inactive'

## Map API Endpoints

## Endpoint: `/api/map/getAddress`

### Method: GET

### Description
Converts geographical coordinates (latitude and longitude) to a human-readable address using reverse geocoding.

### Query Parameters
- `lat` (number): Latitude coordinate
- `long` (number): Longitude coordinate

### Example Request
```
GET /api/map/getAddress?lat=20.189876713093877&lon=85.70205601101695
```

### Example Successful Response
```json
{
  "success": true,
  "res": {
    "place_id": "229603032",
    "licence": "https://locationiq.com/attribution",
    "osm_type": "way",
    "osm_id": "1209425349",
    "lat": "20.189876713093877",
    "lon": "85.70205601101695",
    "display_name": "Jatani, Khordha, Odisha, 752050, India",
    "address": {
      "county": "Jatani",
      "state_district": "Khordha",
      "state": "Odisha",
      "postcode": "752050",
      "country": "India",
      "country_code": "in"
    },
    "boundingbox": [
      "20.1774897",
      "20.1917859",
      "85.7016394",
      "85.7024179"
    ]
  }
}
```

### Example Error Response
```json
{
    "success": false,
    "message": "Please provide both latitude and longitude"
}
```

## Endpoint: `/api/map/getCoords`

### Method: GET

### Description
Converts a text address to geographical coordinates using forward geocoding.

### Query Parameters
- `address` (string): The address to convert to coordinates

### Example Request
```
GET /api/map/getCoords?address=Bhubaneshwar
```

### Example Successful Response
```json
{
  "success": true,
  "res": [
    {
      "place_id": "229598715",
      "licence": "https://locationiq.com/attribution",
      "osm_type": "node",
      "osm_id": "1051669585",
      "boundingbox": [
        "20.1002964",
        "20.4202964",
        "85.6794521",
        "85.9994521"
      ],
      "lat": "20.2602964",
      "lon": "85.8394521",
      "display_name": "Bhubaneshwar, Bhubaneswar Municipal Corporation, Bhubaneswar (M.Corp.), Khordha, Odisha, 751001, India",
      "class": "place",
      "type": "city",
      "importance": 0.6627987075944713,
      "icon": "https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png"
    },
    {
      "place_id": "229592530",
      "licence": "https://locationiq.com/attribution",
      "osm_type": "node",
      "osm_id": "2669102677",
      "boundingbox": [
        "20.2617774",
        "20.2717774",
        "85.8385592",
        "85.8485592"
      ],
      "lat": "20.2667774",
      "lon": "85.8435592",
      "display_name": "Bhubaneswar, Lane number 1, Budheswari Colony, Ward 42, South East Zone, Bhubaneswar Municipal Corporation, Bhubaneswar (M.Corp.), Khordha, Odisha, 751006, India",
      "class": "railway",
      "type": "station",
      "importance": 0.5064685177429556,
      "icon": "https://locationiq.org/static/images/mapicons/transport_train_station2.p.20.png"
    },
    {
      "place_id": "229599285",
      "licence": "https://locationiq.com/attribution",
      "osm_type": "relation",
      "osm_id": "10108023",
      "boundingbox": [
        "20.1897532",
        "20.3724291",
        "85.7540845",
        "85.9023571"
      ],
      "lat": "20.28105765",
      "lon": "85.81140263163533",
      "display_name": "Bhubaneswar (M.Corp.), Khordha, Odisha, India",
      "class": "boundary",
      "type": "administrative",
      "importance": 0.34006161364156556,
      "icon": "https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png"
    }
  ]
}
```

### Example Error Response
```json
{
    "success": false,
    "message": "Please provide an address"
}
```

## Endpoint: `/api/map/getRoute`

### Method: GET

### Description
Calculates the route and distance between two points using their coordinates.

### Query Parameters
- `originLat` (number): Origin point latitude
- `originLon` (number): Origin point longitude
- `destLat` (number): Destination point latitude
- `destLon` (number): Destination point longitude

### Example Request
```
GET /api/map/getRoute?originLat=51.5074&originLon=-0.1278&destLat=51.7520&destLon=-1.2577
```

### Example Successful Response
```json
{
  "success": true,
  "distance": {
    "code": "Ok",
    "routes": [
      {
        "geometry": "y`tzBcq|jOgzJkhGs`Esk@ueNzgAygB_vBirN_bGde@t`SeqDpqHs`C`hQ{kEheI}_F`fCiV`gFewHh}@gsA~mJktDt~BikFrdPg~A`xPg{CxvBmnDrcLeWj}ThvBddG|N`eF~iBbfDwxKbjVkkCjiB}hD|iOhe@`{BgdAjiFq{C|qG}xJzqf@oyIleJ_p@|vE`bAx|A_lAdwApnAdiGygBx_ImjChbCeWhhEevAtaAaz@`_EozCxwAmmGi_@}{GzdEq_In}@ufBftCi}IliCcmE`hDsaJb_M}qAbW",
        "legs": [
          {
            "steps": [],
            "summary": "",
            "weight": 12874.9,
            "duration": 12874.9,
            "distance": 299092.5
          }
        ],
        "weight_name": "routability",
        "weight": 12874.9,
        "duration": 12874.9,
        "distance": 299092.5
      }
    ],
    "waypoints": [
      {
        "hint": "WWfzg8R0V5woAAAAKAAAAE8AAAAAAAAAwbHiQZY520HC_1tCAAAAACgAAAAoAAAATwAAAAAAAAAdNQEAU88dBR4lNQFczh0FyCU1AQEATwIhlyd6",
        "distance": 31.937139143,
        "name": "",
        "location": [
          85.839699,
          20.260126
        ]
      },
      {
        "hint": "V3LLnP___38NAAAAKwAAAA4AAAAMAAAASB_LQX-SVEL6K8RB-navQQ0AAAArAAAADgAAAAwAAAAdNQEAtmABBQedRwHXXwEFS51HAQEALwEhlyd6",
        "distance": 24.306760018,
        "name": "",
        "location": [
          83.976374,
          21.470471
        ]
      }
    ]
  }
}
```

### Example Error Response
```json
{
    "success": false,
    "message": "Please provide origin and destination"
}
```

## Endpoint: `/api/map/getSuggestions`

### Method: GET

### Description
Provides address suggestions based on a partial text input (autocomplete).

### Query Parameters
- `query` (string): Partial address text to get suggestions for

### Example Request
```
GET /api/map/getSuggestions?query=sambalpur
```

### Example Successful Response
```json
{
  "success": true,
  "suggestions": [
    {
      "place_id": "320534129806",
      "osm_id": "806277894",
      "osm_type": "node",
      "licence": "https://locationiq.com/attribution",
      "lat": "21.4705391",
      "lon": "83.9761511",
      "boundingbox": [
        "21.3105391",
        "21.6305391",
        "83.8161511",
        "84.1361511"
      ],
      "class": "place",
      "type": "city",
      "display_name": "Sambalpur, Sambalpur, Odisha, 768001, India",
      "display_place": "Sambalpur",
      "display_address": "Odisha, 768001, India",
      "address": {
        "name": "Sambalpur",
        "county": "Sambalpur",
        "state": "Odisha",
        "postcode": "768001",
        "country": "India",
        "country_code": "in"
      }
    },
    {
      "place_id": "324115633759",
      "osm_id": "1984036",
      "osm_type": "relation",
      "licence": "https://locationiq.com/attribution",
      "lat": "21.5570606",
      "lon": "84.15285151",
      "boundingbox": [
        "20.9213189",
        "22.190127",
        "83.7969088",
        "84.7696495"
      ],
      "class": "boundary",
      "type": "administrative",
      "display_name": "Sambalpur, Odisha, India",
      "display_place": "Sambalpur",
      "display_address": "Odisha, India",
      "address": {
        "name": "Sambalpur",
        "state": "Odisha",
        "country": "India",
        "country_code": "in"
      }
    },
    {
      "place_id": "321066212771",
      "osm_id": "1056563399",
      "osm_type": "node",
      "licence": "https://locationiq.com/attribution",
      "lat": "21.476515",
      "lon": "84.0076678",
      "boundingbox": [
        "21.471515",
        "21.481515",
        "84.0026678",
        "84.0126678"
      ],
      "class": "railway",
      "type": "station",
      "display_name": "Sambalpur City, Sambalpur, Sambalpur, Odisha, 768004, India",
      "display_place": "Sambalpur City",
      "display_address": "Sambalpur, Sambalpur, Odisha, 768004, India",
      "address": {
        "name": "Sambalpur City",
        "city": "Sambalpur",
        "county": "Sambalpur",
        "state": "Odisha",
        "postcode": "768004",
        "country": "India",
        "country_code": "in"
      }
    },
    {
      "place_id": "322763046753",
      "osm_id": "8607930523",
      "osm_type": "node",
      "licence": "https://locationiq.com/attribution",
      "lat": "21.477722",
      "lon": "83.9761971",
      "boundingbox": [
        "21.472722",
        "21.482722",
        "83.9711971",
        "83.9811971"
      ],
      "class": "railway",
      "type": "station",
      "display_name": "Sambalpur Road, Station Road, Sambalpur, Sambalpur, Odisha, 768002, India",
      "display_place": "Sambalpur Road",
      "display_address": "Station Road, Sambalpur, Sambalpur, Odisha, 768002, India",
      "address": {
        "name": "Sambalpur Road",
        "road": "Station Road",
        "city": "Sambalpur",
        "county": "Sambalpur",
        "state": "Odisha",
        "postcode": "768002",
        "country": "India",
        "country_code": "in"
      }
    },
    {
      "place_id": "322210581181",
      "osm_id": "7650305853",
      "osm_type": "node",
      "licence": "https://locationiq.com/attribution",
      "lat": "21.4829662",
      "lon": "83.9613149",
      "boundingbox": [
        "21.4779662",
        "21.4879662",
        "83.9563149",
        "83.9663149"
      ],
      "class": "railway",
      "type": "station",
      "display_name": "Sambalpur Junction, Station Road, Sambalpur, Sambalpur, Odisha, 768002, India",
      "display_place": "Sambalpur Junction",
      "display_address": "Station Road, Sambalpur, Sambalpur, Odisha, 768002, India",
      "address": {
        "name": "Sambalpur Junction",
        "road": "Station Road",
        "city": "Sambalpur",
        "county": "Sambalpur",
        "state": "Odisha",
        "postcode": "768002",
        "country": "India",
        "country_code": "in"
      }
    }
  ]
}
```

### Example Error Response
```json
{
    "success": false,
    "message": "Please provide a query"
}
```

### Note
All map endpoints use the LocationIQ API service and require valid API credentials in the server environment.







