const express = require("express");
const app = express();

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    module.exports = require("./prod");
} else {
    module.exports = require("./dev");
}