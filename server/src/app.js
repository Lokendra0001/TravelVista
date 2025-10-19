require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT;
const Route = require("./routes/index");
const handleConnectMongo = require("./libs/dbConfig");


handleConnectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("HELLO FROM SERVER!")
})


app.use("/api", Route)
app.listen(PORT, () => console.log(`Server Started at ${PORT}`))