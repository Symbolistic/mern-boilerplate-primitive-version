const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Symbol:test@cluster0-3t5ag.mongodb.net/BOILERPLATE?retryWrites=true&w=majority",
                 { useNewUrlParser:true, useUnifiedTopology: true }).then(() => console.log("Connected to Database"))
                                                                    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(5000);