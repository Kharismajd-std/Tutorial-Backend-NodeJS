const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use("/siswa", require("./routes/siswa"));
app.use("/kelas", require("./routes/kelas"));

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});