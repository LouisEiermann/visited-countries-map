require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const basicAuth = require("express-basic-auth");
const { MongoClient } = require("mongodb");

const client = new MongoClient(
  `mongodb+srv://LouisEiermann:${process.env.DB_PASSWORD}@cluster0.owkc6.mongodb.net/bucketlist?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function connect() {
  await client.connect();
  console.log("connected to DB");

  const app = express();

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use("/build", express.static(path.join(__dirname, "../build")));

  // app.use(basicAuth({
  //     challenge: true,
  //     users: { 'admin': 'supersecret' }
  // }))

  app.use(express.json());

  app.post("/saveState", (req, res) => {
    const collection = client.db("bucketlist").collection("countries");
    let countriesDocument = { countries: req.body };
    collection.replaceOne({}, countriesDocument, { upsert: true });
  });

  app.get("/getState", (req, res) => {
    const collection = client.db("bucketlist").collection("countries");
    collection.findOne().then((document) => {
      res.send({ visited: document });
    });
  });

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../build/", "index.html"));
  });

  app.listen(9000);
}
connect();
