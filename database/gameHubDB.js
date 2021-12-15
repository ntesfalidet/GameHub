const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

// Variables for setting up connection to database
const URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DB_NAME = "game-hub-db";

function gameHubDB() {
  // Database operations/functions in gameHubDB object
  const gameHubDB = {};

  // Finds existing user object (based on attributes of user object as a query)
  // This function is called when a user (gamer or gaming company) logs in and
  // for getting my games for a gaming company user.
  // Nathaniel
  gameHubDB.findUser = async function (user) {
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-hub-db");
      await client.connect();
      console.log("Connected to game-hub-db");
      const db = client.db(DB_NAME);
      const usersCollection = db.collection("users");
      // returns the array of users in users collection that match
      // the passed in user object as query
      return await usersCollection.find(user).toArray();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-hub-db");
      await client.close();
    }
  };

  // Create new user object and insert that into the database
  // This function is called when a user sign up in GameHub
  // Yuanyuan
  gameHubDB.createUser = async function (user) {
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting Database");
      await client.connect();
      console.log("Connected Successfully");
      const res = await client.db(DB_NAME).collection("users").insertOne(user);
      console.log("Inserted", res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing Connection");
      client.close();
    }
  };

  // Queries and gets all the games from the gamestore collection
  // Nathaniel
  gameHubDB.getAllStoreGames = async function () {
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-hub-db");
      await client.connect();
      console.log("Connected to game-hub-db");
      const db = client.db(DB_NAME);
      const gameStoreCollection = db.collection("gamestore");
      const query = {};
      // returns the response of querying and getting all games
      // from gamestore collection
      return await gameStoreCollection.find(query).toArray();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-sharing-db");
      await client.close();
    }
  };

  // Inserts game object to gamestore collection
  // This function is called when a gaming company publishes a game
  // Nathaniel
  gameHubDB.publishGameToStore = async function (game) {
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-hub-db");
      await client.connect();
      console.log("Connected to game-hub-db");
      const db = client.db(DB_NAME);
      const gameStoreCollection = db.collection("gamestore");
      // returns the response of inserting game object in
      // the gamestore collection
      return await gameStoreCollection.insertOne(game);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-hub-db");
      await client.close();
    }
  };

  // Add game object to the myGames array of a gaming company user
  // This function is called when a gaming company publishes a game
  // Nathaniel
  gameHubDB.addGameToMyGames = async function (gamingCompanyUser, game) {
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-hub-db");
      await client.connect();
      console.log("Connected to game-hub-db");
      const db = client.db(DB_NAME);
      const usersCollection = db.collection("users");
      // returns the response of updating myGames field
      // (inserting game object to myGames field)
      // of a gaming company user
      return await usersCollection.updateOne(
        { _id: new ObjectId(gamingCompanyUser._id) },
        { $push: { myGames: game } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-hub-db");
      await client.close();
    }
  };

  // Delete game object from gamestore collection
  // This function is called when a gaming company deletes a game
  // from their my games list.
  // Nathaniel
  gameHubDB.deleteGameFromStore = async function (game) {
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-hub-db");
      await client.connect();
      console.log("Connected to game-hub-db");
      const db = client.db(DB_NAME);
      const gameStoreCollection = db.collection("gamestore");
      // returns the response of deleting game object from
      // the gamestore collection
      return await gameStoreCollection.deleteOne({
        _id: new ObjectId(game._id),
        gameTitle: game.gameTitle,
        gameImageURL: game.gameImageURL,
        gameDesc: game.gameDesc,
        gamePrice: game.gamePrice,
        publishedBy: game.publishedBy,
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-hub-db");
      await client.close();
    }
  };

  // Delete game object from the myGames array of a gaming company user
  // This function is called when a gaming company deletes a game
  // from their my games list.
  // Nathaniel
  gameHubDB.deleteGameFromMyGames = async function (gamingCompanyUser, game) {
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-hub-db");
      await client.connect();
      console.log("Connected to game-hub-db");
      const db = client.db(DB_NAME);
      const usersCollection = db.collection("users");
      // returns the response of updating myGames field
      // (deleting game object from myGames field)
      // of a gaming company user
      return await usersCollection.updateOne(
        { _id: new ObjectId(gamingCompanyUser._id) },
        { $pull: { myGames: { _id: new ObjectId(game._id) } } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-hub-db");
      await client.close();
    }
  };

  // When gamers adds games to their cart, games will be insert into cart collection.
  // This function is called when gamers are adding game objects to their cart.
  // Yuanyuan
  gameHubDB.addGameToCart = async function (game, user) {
    let client;
    // check whether the user is a gamer
    // if the user is a gamer, then we are doing following things
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-hub-db");
      await client.connect();
      console.log("Successfully connected");
      const db = client.db(DB_NAME);
      const usersCollection = db.collection("users");
      console.log(user);
      console.log(game);
      return await usersCollection.updateOne(
        { _id: new ObjectId(user._id) },
        { $push: { cart: game } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing");
      await client.close();
    }
  };

  // Delete items from cart array
  // Yuanyuan
  gameHubDB.deleteItems = async function (user, game) {
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-hub-db");
      await client.connect();
      console.log("Successfully connected");
      const db = client.db(DB_NAME);
      const usersCollection = db.collection("users");
      return await usersCollection.updateOne(
        { _id: new ObjectId(user._id) },
        { $pull: { cart: { _id: game._id } } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connect");
      await client.close();
    }
  };

  return gameHubDB;
}

module.exports = gameHubDB();
