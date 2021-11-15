require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
session = require("express-session");
const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  await client.connect();

  const app = express();

  /*app.use(
    cors({
      origin: "*",
    })
  );*/

  app.use(
    session({
      secret: "2C44-4D44-WppQ38S",
      resave: true,
      saveUninitialized: true,
    })
  );

  // Authentication and Authorization Middleware
  let auth = function (req, res, next) {
    if (
      req.session &&
      req.session.user === process.env.SESSION_USERNAME &&
      req.session.admin
    )
      return next();
    else return res.sendStatus(401);
  };

  app.get("/login", function (req, res) {
    if (!req.query.username || !req.query.password) {
      res.send("login failed");
    } else if (
      req.query.username === process.env.SESSION_USERNAME &&
      req.query.password === process.env.SESSION_PASSWORD.split(" ")
    ) {
      req.session.user = req.query.username;
      req.session.admin = true;
      res.send("login success!");
    }
  });

  app.get("/logout", function (req, res) {
    req.session.destroy();
    res.send("logout success!");
  });

  app.use("/build", express.static(path.join(__dirname, "../build")));

  app.use(express.json());

  // Routes for manipulating the bucketlist items
  app.post("/createitem", (req, res) => {
    const collection = client.db("bucketlist").collection("listitems");
    const document = collection.insertOne({
      activity: req.body.activity,
      done: req.body.done,
    });
    res.send({ item: document });
  });

  app.get("/readitems", (req, res) => {
    const collection = client.db("bucketlist").collection("listitems");
    collection
      .find()
      .toArray()
      .then((data) => {
        res.send(JSON.stringify(data));
      });
  });

  app.post("/updateitem", (req, res) => {
    const collection = client.db("bucketlist").collection("listitems");
    collection.replaceOne(
      { _id: ObjectId(req.body._id) },
      {
        activity: req.body.activity,
        done: req.body.done,
      },
      {
        upsert: true,
      }
    );
    res.send("updated item");
  });

  app.post("/deleteitem", (req, res) => {
    const collection = client.db("bucketlist").collection("listitems");
    collection.deleteOne({ _id: ObjectId(req.body._id) });
    res.send("deleted item");
  });

  // Routes for manipulating the visited countries
  app.post("/saveState", (req) => {
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

  app.get("*", auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../build/", "index.html"));
  });

  app.listen(9000);
}
connect().then(() => console.log("connected to DB"));
