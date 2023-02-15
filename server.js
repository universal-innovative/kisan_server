const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// import routes

// --------------------------------------------------------------------

// app
const app = express();

// db
const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4 // Use IPv4, skip trying IPv6
};
mongoose
  .connect(process.env.DATABASE, options)
  .then(() => console.log("DB CONNECTION SUCCESSFUL ✨"))
  .catch((err) => console.log("DB CONNECTION ERROR 🐛", err));

// middlewares
app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "2mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(express.static("public"));
app.use(cors(corsOptions));
// routes middleware

readdirSync("routes").map((r) => app.use("/api", require("./routes/" + r)));

// port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running at port ${port}`));
