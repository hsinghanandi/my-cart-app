const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}`)
});

app.locals.items = require("./data.json").lineItems;

app.get('/api/v1/items', (req, res) => {
    res.json(app.locals.items);
});