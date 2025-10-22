require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 3000;
const Route = require("./routes/index");
const handleConnectMongo = require("./libs/dbConfig");
const cors = require('cors')

handleConnectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    origin: ["http://localhost:5173"],

}))

app.get("/", (req, res) => {
    res.send("HELLO FROM SERVER!")
})


app.use("/api", Route)
app.listen(PORT, () => console.log(`Server Started at ${PORT}`))