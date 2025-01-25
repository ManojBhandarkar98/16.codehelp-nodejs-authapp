const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const user = require("./routes/user");

app.use("/api/v1", user);

const connect = require("./config/database");
connect();

app.listen(PORT, () => {
    console.log(`app is running at port no ${PORT}`);
})

app.get("/", (req, res) => {
    res.send('<h1>This is Home Page</h1>');
    console.log('This is Home Page')
})
