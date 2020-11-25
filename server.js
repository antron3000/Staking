var express = require("express");
var path = require("path");

const PORT = process.env.PORT || 3030;

let app = express();

app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
