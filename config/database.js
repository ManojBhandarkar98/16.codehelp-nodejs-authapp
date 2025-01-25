const mongoose = require('mongoose');

require("dotenv").config();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('DB connected Successfully'))
        .catch((error) => {
            console.log("Issue in DB connection");
            console.error(error.message);
            process.exit(1);
        })
}

module.exports = connect;