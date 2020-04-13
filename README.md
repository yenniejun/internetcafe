# Internet Cafe
A virtual coffeeshop experience for those of us who are stuck at home but long for the human contact and vibe of a cafe.

# About
To Do

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
```
npm i nodemon -g
```

## Installation


1. Clone the repo
```
git clone https://github.com/yenniejun/internetcafe.git
```

2. Enable CORS ([Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)) to allow cross-origin requests
```
npm install --save cors
```

3. Open one Terminal window to install the server dependencies and run the Express backend. 

```
cd api
npm install
npm start
```

The server will be running on `localhost:3001`

4. Open a separate Terminal window to install the client dependencies and run the React frontend.
```
cd client
npm install
npm start
```

The client will be running on `localhost:3000`

5. Navigate to `localhost:3000` on a browser to see the app running. You can make API calls to `localhost:3001`.


# Built With
* React (create-react-app)
* Express
* Heroku

# Deployment
To Do
