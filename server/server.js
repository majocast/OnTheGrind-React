const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

let PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
})