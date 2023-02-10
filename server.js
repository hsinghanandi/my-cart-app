const express = require('express');
const cors = require('cors');
const app = express();
const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}`)
});

app.use(cors());

app.locals.items = require("./data.json").lineItems;
app.locals.deliveryDates = require("./data.json").DELIVERY_DATES;


app.get('/api/v1/items', (req, res) => {
    res.json(app.locals.items);
});

app.get("/api/v1/items/delivery-dates", (req, res) => {
    res.json(app.locals.deliveryDates);
});