# QuickBite: Food ordering application

## Description
Food ordering app, with multiple restaurants. Users can create a restaurant, adding dishes, and making orders. 


## Business model
![plot](./model.png)
## Tech stack

- NodeJS/Express
- Postgres
- Javascript
- ReactJS (Hooks, Routers, Redux)
- HTML/CSS/TailwindCSS
- Docker


## Run locally with Docker
Alternatively you can use Docker to run the application. This approach is simpler, but the application still needs your service account from Firebase.

### Environment variables.
| Variable Name           | Description                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------|
| PG_PASSWORD            | Password of for the PostgresSQL server (You can set whatever here as long as it is longer than 6 characters) |
| CREDS                     | Service account of Firebase server |


Run in development mode 
```
docker compose up
```

Run in production mode
```
docker compose -f docker-compose.prod.yml up
```


