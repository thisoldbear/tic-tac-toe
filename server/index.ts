const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const uri = "mongodb://mongoadmin:thinline@localhost:27017";
const client = new MongoClient(uri);

/**
 * Crude way of creating a "tic-tac-toe" db if one does not exist
 */
const initDatabase = async () => {
  try {
    await client.connect();

    const databasesList = await client.db().admin().listDatabases();

    if (!databasesList.databases.find((db) => db.name === "tic-tac-toe")) {
      console.log("Adding new database");

      const newDB = client.db("tic-tac-toe");
      newDB.createCollection("scores");
      client
        .db("tic-tac-toe")
        .collection("scores")
        .insertMany([
          {
            player: "X",
            wins: 0,
            losses: 0,
          },
          {
            player: "O",
            wins: 0,
            losses: 0,
          },
        ]);
    }
  } catch (e) {
    console.error(e);
  }
};

initDatabase();

app.get("/scores", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

  await client.connect();

  const scores = await client
    .db("tic-tac-toe")
    .collection("scores")
    .find({})
    .toArray((err, result) => {
      if (err) {
        throw err;
      }
    });

  res.setHeader("Content-Type", "application/json");

  res.json(scores);
});

app.post("/update-scores", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

  const { winner, loser } = req.query;

  if (!winner || !loser) {
    res.send({
      message: `Please send a winner and a loser param`,
    });
  }

  await client.connect();

  await client
    .db("tic-tac-toe")
    .collection("scores")
    .updateOne({ player: winner }, { $inc: { wins: 1 } }, function (err, res) {
      if (err) throw err;
    });

  await client
    .db("tic-tac-toe")
    .collection("scores")
    .updateOne({ player: loser }, { $inc: { losses: 1 } }, function (err, res) {
      if (err) throw err;
    });

  res.send({
    message: `Scores updated`,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use(cors());
