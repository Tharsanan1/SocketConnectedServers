const express = require('express');
const app = express();
const port = 5000;
const { v4: uuidv4 } = require('uuid');

app.get('*', (req, res) => {
    res.send("hello from the other side.")
    console.log("response sent to client");
});

app.post('*', (req, res) => {
    res.statusCode = 200;
    res.send("hello from the other side.")
    console.log("response sent to client");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});