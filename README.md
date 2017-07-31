# Visited Countries Backend

This app works as the backend for the `visitedcountries` app and is currently hosted in Heroku.

It is a small NodeJS application which creates a simple express server.

The service exposes a small API which is then consumed by the `visitedcountries` app to read and store user data from the MongoDB database.

The application consuming this service can be found at https://mmellado.github.io/visitedcountries/.

## API

### GET /api/users/:uid:

Retrieves the user's country information. If the user doesn't exist, it creates it and returns an object with an empty countries array. This is to keep track of the number of users that have logged in into the app.

#### Response

```javascript
  {
    "status": 200,
    "_id": "XXXXXXXXXXXXXXXXXXXXXX", // The users id in the DB
    "uid": "XXXXXXXXXXXXXXXXXXXXXX", // The user's FB uid
    "countries": ["DK", "UK"], // Array containing the country codes stored by the user
    "created": "2017-07-30T10:00:08.976Z", // Timestamp of the user creation date
    "lastUpdated": "2017-07-30T10:02:31.980Z" // Timestamp for the last update to the user's records
  }
```

### PUT /api/users/:uid:

Updates the user's country entries.

#### Expected body

```javascript
  {
    "countries": ["DK", "UK", "US"] // Updated list of country codes for the user
  }
```

#### Response

```javascript
  {
    "status": 200 // Response code. Will be 500 if an error happens
  }
```

## Feature requests & Bug reports

If there's more features you'd like to have in this app, please file an issue or submit a pull request with your changes. Contributions are very welcome :)

## Upcoming features

- API Token creation
- API domain restriction (http://mmellado.github.io and the own domain for development purposes)
