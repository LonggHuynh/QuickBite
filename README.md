# QuickBite: Food ordering application
Food ordering app, with multiple restaurants. Users can create a restaurant, adding dishes, and making orders. 

# Business model
![plot](./model.png)

# Tech stack
- NodeJS/Express
- Postgres
- TypeScript
- ReactJS (Query, Zudstand)

# Run locally
## Frontend
### Build environment variables
| Variable Name           | Description                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------|
| REACT_APP_API_URL            | URL of the backend (if not set, defaulting to '/api' in case of reverse proxy) |

To start the frontend, use

```
npm start
```

The frontend starts at port 3000

## Backend
### Environment variables
| Variable Name           | Description                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------|
| JWT_SECRET            | Secret used in to generate signatures for JWT (SHA256)  |
| DATABASE_URL          | URL of the Postgres database                                                                                  |
| PORT                  | Port number on which the backend server will run, default 5000                                                              |
| AZURE_STORAGE_ACCOUNT_NAME | Azure Storage account name                                                                               |
| AZURE_CONTAINER_NAME  | Azure Storage container name                                                                                  |
| AZURE_STORAGE_CONNECTION_STRING | Connection string for Azure Storage                                                                 |

To run the backend, use

```
npm run dev
```
Swagger server starts at http://localhost:5000/api-docs

# Running Tests
To run tests for the backend, use

```
npm run test
```

or with coverage

```
npm run test -- --coverage
```
