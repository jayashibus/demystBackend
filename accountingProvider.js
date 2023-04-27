// Import express and create an instance of the express app
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Define the GET route for fetching balance sheet data from accounting provider
app.post("/api/balance-sheet", (req, res) => {
  const { name, email, bname } = req.body;

  // Fetch the balance sheet data from the accounting provider (dummy data for simulation)
  const balanceSheet = [
    { year: 2020, month: 12, profitOrLoss: 250000, assetsValue: 1234 },
    { year: 2020, month: 11, profitOrLoss: 1150, assetsValue: 5789 },
    { year: 2020, month: 10, profitOrLoss: 2500, assetsValue: 22345 },
    { year: 2020, month: 9, profitOrLoss: -187000, assetsValue: 223452 },
    { year: 2020, month: 8, profitOrLoss: -187000, assetsValue: 223452 },
    { year: 2020, month: 7, profitOrLoss: -187000, assetsValue: 223452 },
    { year: 2020, month: 6, profitOrLoss: -187000, assetsValue: 223452 },
  ];

  // Send the balance sheet data as response
  res.json({ balanceSheet });
  //console.log(balanceSheet);
});

// Start the server on port 3000 (or any other desired port)
app.listen(5032, () => {
  console.log("Server is running on port 5032");
});
