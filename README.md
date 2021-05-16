# Room booking system

## Getting Started
Follow these steps to get the project setup on your machine.

### 1. Clone the repository

```bash
git clone git@github.com:vladi99/room-booking-system.git
```

### 2. Install Docker

Download and run the relevant installer for your operating system from here: https://docs.docker.com/get-docker/

### 3. docker-compose installation

```bash
# Build docker image
docker-compose build

# Run the app
docker-compose up
```

### 4. Setup complete
You can now access the application in your browser.

* API - http://localhost:4200/
* CLIENT - http://localhost:3000/
* Database Client - http://localhost:8000/ (Username: admin, Password: 123456)

## Guidelines

### Build images

```bash
# Build api image
docker build ./api --file api/Dockerfile.prod --tag <user>/room-booking-system_api:<version>

# Build client image
docker build ./client --build-arg REACT_APP_API_URL=<API_URL> --build-arg DISABLE_ESLINT_PLUGIN=true --file client/Dockerfile.prod --tag <user>/room-booking-system_client:<version>
```

### Push images

```bash
# Push api image
docker push <user>/room-booking-system_api:<version>

# Push client image
docker push <user>/room-booking-system_client:<version>
```


### Run images

```bash
# Create network
docker network create room-booking-system

# Run the db
docker run --name mysql --rm --network room-booking -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=room_booking_system_development -e MYSQL_USER=admin -e MYSQL_PASSWORD=123456 mysql:8.0.20

# Run the api
docker run --name=room-booking-system-api --rm --network=room-booking-system -p 4200:4200 -e PORT=4200 -e MYSQL_USER=admin -e MYSQL_PASSWORD=123456 -e MYSQL_DATABASE=room_booking_system_development -e MYSQL_HOST_IP=mysql <user>/room-booking-system_api:<version>

# Run the client
docker run --name=room-booking-system-client --rm --network=room-booking-system -p 1337:80 <user>/room-booking-system_client:<version>
```
## Live URLs

* API - https://room-booking-system-api.herokuapp.com
* CLIENT - https://book-room-system.herokuapp.com

## Running tests

This section is empty

## Migrations
Pending migrations are run automatically on start. For more specific info see commands below.

```bash
# Connect to api docker container
docker ps
docker exec -it <containerId> sh

# Check migration status
npx sequelize-cli db:migrate:status

# Run all pending migrations
npx sequelize-cli db:migrate

# Undo latest migration
npx sequelize-cli db:migrate:undo

# Generate migration (make sure you change file extension to cjs)
npx sequelize-cli migration:generate --name <name-of-migration>

# Generate model + migration (make sure you change migration file extension to cjs)
npx sequelize-cli model:generate --name <ModelName> --attributes <attribute-name>:<attribute-type>,...
```
