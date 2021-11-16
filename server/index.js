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

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
    else return res.redirect("/login");
  };

  app.post("/auth", function (req, res) {
    if (!req.body.username || !req.body.password) {
      res.redirect("/login");
    } else if (
      (req.body.username === process.env.SESSION_USERNAME &&
        req.body.password === process.env.SESSION_PASSWORD.split(",")[0]) ||
      req.body.password === process.env.SESSION_PASSWORD.split(",")[1]
    ) {
      req.session.user = req.body.username;
      req.session.admin = true;
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });

  app.get("/login", function (req, res) {
    if (!req.body.username || !req.body.password) {
      res.sendFile(path.join(__dirname, "./", "login.html"));
    } else if (
      req.body.username === process.env.SESSION_USERNAME &&
      req.body.password === process.env.SESSION_PASSWORD.split(" ")
    ) {
      req.session.user = req.body.username;
      req.session.admin = true;
      res.redirect("/");
    }
  });

  app.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/login");
  });

  app.use("/build", express.static(path.join(__dirname, "../build")));

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

  app.get("/", auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../build/", "index.html"));
  });

  app.listen(9000);
}
connect().then(() => console.log("connected to DB"));
