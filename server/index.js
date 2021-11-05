const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth')

const app = express();

app.use('/build',express.static(path.join(__dirname, '../build')));

app.use(basicAuth({
    challenge: true,
    users: { 'admin': 'supersecret' }
}))

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/', "index.html"));
});

app.listen(9000);