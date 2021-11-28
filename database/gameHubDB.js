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
      client = new MongoClient(URL, {useUnifiedTopology: trye});
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
      client.close;
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

  // Inserts game object to gameStore collection
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
  }

  // Add a game to the myGames array of a gaming company user
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
        // userName: gamingCompanyUser.userName,
        // role: gamingCompanyUser.role, 
        { _id: new ObjectId(gamingCompanyUser._id) },
        { $push: { myGames: game } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-hub-db");
      await client.close();
    }
  }

    // When gamers adds games to their cart, games will be insert into cart collection.
  // This function is called when gamers are adding game objects to their cart.
  // Yuanyuan
  gameHubDB.addGameToCart = async function (game) {
    let client;
    // check whether the user is a gamer
    // if the user is a gamer, then we are doing following things
    if (user.type == 'gamer') {
      try {
        client = new MongoClient(URL, {userUnifiedTopology: true});
        console.log("Connecting to game-hub-db");
        await client.connect();
        console.log("Successfully connected");
        const db = client.db(DB_NAME);
        const cartCollection = db.collection("cart");
        return await cartCollection.insertOne(game);
      } catch(error) {
        console.log(error);
      } finally {
        console.log("Closing");
        await client.close();
      }
    } else {
      console.log("The user is not a gamer");
    }
  }



  return gameHubDB;
}

module.exports = gameHubDB();