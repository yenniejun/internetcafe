# Internet Cafe
A virtual coffeeshop experience for those of us who are stuck at home but long for the human contact and vibe of a cafe.

# About
To Do

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Install [node.js](https://nodejs.org/en/download/package-manager)
```
brew install node
```

Install nodemon
```
npm i nodemon -g
```

## Installation


1. Clone the repo
```
git clone https://github.com/yenniejun/internetcafe.git
```

2. Open one Terminal window to install the server dependencies and run the Express backend. 

```
cd api
npm install
nodemon app.js
```

The server will be running on `localhost:3001`

3. Open a separate Terminal window to install the client dependencies and run the React frontend.
```
cd client
npm install
npm start
```

The client will be running on `localhost:3000`

4. Navigate to `localhost:3000` on a browser to see the app running. You can make API calls to `localhost:3001`.

5. Set up the (local) database. Install and start [PostgreSQL](https://www.postgresql.org/download/)
```
brew install postgresql
brew services start postgresql
```

Login to postgres
```
psql postgres
```

Create a user and password and give them create database access.

```
CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;
```

Log out of the root user and log in to the newly created user.

```
\q
psql -d postgres -U me
```

Create database and connect to it
```
CREATE DATABASE cafe_api;
\c cafe_api
```

Create table and insert values by running the script in `init.sql`.


# Built With
* React (create-react-app)
* Express
* Heroku
* socket.io
* PostgreSQL
* Winston (logging)


# Deployment
To ensure we deploy from the correct folder, we need to only push the api sub-folder to heroku. Run the following command from the home folder (the one above /api)
```
git subtree push --prefix api heroku master   
```


# TO DO
* List existing cafes -> button that lets you go to the cafe
* Make "Logout" into a react component
* List existing cafes only lists public cafes?



* When you create a cafe, show the popup to enter the cafe before you do
