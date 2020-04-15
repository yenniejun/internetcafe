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



# Built With
* React (create-react-app)
* Express
* Heroku

# Deployment
To Do
