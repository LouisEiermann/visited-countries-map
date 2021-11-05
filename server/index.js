const express = require('express');
const cors = require('cors');
const path = require('path');
const basicAuth = require('express-basic-auth')
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://LouisEiermann:<password>@cluster0.owkc6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

const app = express();

app.use(cors({
    origin: '*'
}));

app.use('/build',express.static(path.join(__dirname, '../build')));

// app.use(basicAuth({
//     challenge: true,
//     users: { 'admin': 'supersecret' }
// }))

app.use(express.json())

app.post("/saveState", (req, res) => {
    console.log(req.body)
    res.json({ message: "Hello from server!" });
});

app.get("/getState", (req, res) => {
    console.log(req.body)
    res.json({ message: "Hello from server!" });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/', "index.html"));
});

app.listen(9000);