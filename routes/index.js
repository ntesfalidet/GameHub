const express = require("express");
const router = express.Router();
const gameHubDB = require("../database/gameHubDB.js");

// User login route (Nathaniel)
router.post("/loginUser", async function (req, res) {
  // User data (request) from frontend
  const user = req.body;

  try {
    // Response of finding a user (array of users that match user data)
    const userRes = await gameHubDB.findUser(user);
    console.log("Got user from game-hub-db ", userRes);
    res.status(200).send({ users: userRes });
  } catch (error) {
    console.log("login user error message: ", error);
    res.status(400).send({ err: error });
  }
});

// User register route (Yuanyuan)
// This route will insert user object into users collection
router.post("/register", async function (req, res) {
  let user = req.body;
  let findUserObject = {
    userName: user.userName,
    role: user.role,
  };
  try {
    const userRes = await gameHubDB.findUser(findUserObject);
    // checks whether the user does not exist
    if (!userRes.length) {
      console.log("This user does not exist");
      if (user.role === "Gamer") {
        user.cart = [];
      }

      if (user.role === "Gaming company") {
        user.myGames = [];
      }

      const newUser = await gameHubDB.createUser(user);
      console.log("User successfully registered", newUser);
    }
    res.status(200).send({ users: userRes });
  } catch (error) {
    console.log("Error message: ", error);
    res.status(400).send({ err: error });
  }
});

// Route for getting all games from gamestore collection (Nathaniel)
router.get("/getAllStoreGames", async function (req, res) {
  try {
    // Response of getting all games from the gamestore collection
    const gamesRes = await gameHubDB.getAllStoreGames();
    console.log("Got all games from game-hub-db ", gamesRes);
    res.status(200).send({ storeGames: gamesRes });
  } catch (error) {
    console.log("Get game posts error message: ", error);
    res.status(400).send({ err: error });
  }
});

/// Routes for gaming company (Nathaniel) ///

// Publish game route performs two operations:
// 1. Inserts game object to gamestore collection
// 2. Inserts game object to myGames array for a gaming company user
router.post("/publishGame", async function (req, res) {
  // Game data (request) from frontend
  const game = req.body.gameInputData;
  // Gaming company user data (request) from frontend
  const gamingCompanyUser = req.body.gamingCompanyUser;

  try {
    // Response of publishing a game to gamestore collection
    const publishGameRes = await gameHubDB.publishGameToStore(game);
    console.log("Published game to game-hub-db ", publishGameRes);
    // Response of adding a game to my games for a gaming company user
    const addGameToMyGamesRes = await gameHubDB.addGameToMyGames(
      gamingCompanyUser,
      game
    );
    console.log("Updated my games in game-hub-db ", addGameToMyGamesRes);
    res
      .status(200)
      .send({ message: "Published game to game store and my games" });
  } catch (error) {
    console.log("publish game error message: ", error);
    res.status(400).send({ err: error });
  }
});

// Route for getting my games for a gaming company user
router.post("/getMyGames", async function (req, res) {
  // Gaming company user data (request) from frontend
  const gamingCompanyUser = req.body;
  try {
    // Response of finding a user (gaming company user) from database
    const gamingCompanyUserRes = await gameHubDB.findUser(gamingCompanyUser);
    console.log(
      "Got user (gaming company) from game-hub-db ",
      gamingCompanyUserRes
    );
    // Get my games for a gaming company user
    console.log(
      "Got my games for gaming company ",
      gamingCompanyUserRes[0].myGames
    );
    res.status(200).send({ myGames: gamingCompanyUserRes[0].myGames });
  } catch (error) {
    console.log("get my games error message: ", error);
    res.status(400).send({ err: error });
  }
});

// Delete my game route performs two operations:
// 1. Deletes game object from gamestore collection
// 2. Deletes game object from myGames array for a gaming company user
router.post("/deleteMyGame", async function (req, res) {
  // Game data (request) from frontend
  const game = req.body.gameInputData;
  //console.log(game);
  // Gaming company user data (request) from frontend
  const gamingCompanyUser = req.body.gamingCompanyUser;

  try {
    // Response of deleting a game from gamestore collection
    const delGameRes = await gameHubDB.deleteGameFromStore(game);
    console.log("Deleted game to game-hub-db ", delGameRes);
    // Response of deleting a game from my games for a gaming company user
    const delGameFromMyGamesRes = await gameHubDB.deleteGameFromMyGames(
      gamingCompanyUser,
      game
    );
    console.log("Updated my games in game-hub-db ", delGameFromMyGamesRes);
    res
      .status(200)
      .send({ message: "Deleted game from game store and my games" });
  } catch (error) {
    console.log("delete game error message: ", error);
    res.status(400).send({ err: error });
  }
});

/// Routes for gaming company (Nathaniel) ///

////////////////////////////////////////////////////////////////////////////////

/// Routes for gamer (Yuanyuan) ///

// Add to cart route performs: Add game object to cart collection
router.post("/addToCart", async function (req, res) {
  const user = req.body.user;
  const game = req.body.game;
  try {
    const addGameToCart = await gameHubDB.addGameToCart(game, user);
    console.log("Added game to user's cart", addGameToCart);
    res.status(200).send({ success: true });
  } catch (error) {
    console.log("add game error: ", error);
    res.status(400).send({ err: error });
  }
});

// Get Cart Lists
router.post("/getCartItems", async function (req, res) {
  const gamer = req.body;
  try {
    const gamerRes = await gameHubDB.findUser(gamer);
    res.status(200).send({ cart: gamerRes[0].cart });
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

// Delete Items from cart
router.post("/deleteCartItem", async function (req, res) {
  const game = req.body.gameInfo;
  const user = req.body.gamer;
  try {
    const deleteItemFromCart = await gameHubDB.deleteItems(user, game);
    console.log("Deleted the game item", deleteItemFromCart);
    res.status(200).send({ success: true });
  } catch (error) {
    console.log("Delete game error: ", error);
    res.status(400).send({ err: error });
  }
});

/// Routes for gamer (Yuanyuan) ///

module.exports = router;
