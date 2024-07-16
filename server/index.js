require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./connect/connect");
const bodyParser = require("body-parser");
const cors = require("cors");
const Razorpay = require("razorpay");
const itemRoute = require("./routes/item");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/", itemRoute);

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: req.body.receipt,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
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
