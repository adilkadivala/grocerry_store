require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./connect/connect");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemRoute = require("./routes/item");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// data route
app.use("/", itemRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

const port_no = process.env.SERVER_PORT;

dbConnect.connect((err) => {
  if (err) {
    console.error(err.message);
    return;
  } else {
    console.log("Database Connected");

    app.listen(port_no, () => {
      console.log(`server is running on port_No ${port_no}`);
    });
  }
});
