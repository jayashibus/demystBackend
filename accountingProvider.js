// Import express and create an instance of the express app
const express = require("express");
const app = express();
app.use(express.json());

// Define the GET route for fetching balance sheet data from accounting provider
app.get("/balance-sheet", (req, res) => {
  // Fetch the balance sheet data from the accounting provider (dummy data for simulation)
  const balanceSheet = [
    { year: 2020, month: 12, profitOrLoss: 250000, assetsValue: 1234 },
    { year: 2020, month: 11, profitOrLoss: 1150, assetsValue: 5789 },
    { year: 2020, month: 10, profitOrLoss: 2500, assetsValue: 22345 },
    { year: 2020, month: 9, profitOrLoss: -187000, assetsValue: 223452 },
  ];

  // Send the balance sheet data as response
  res.json({ balanceSheet });
});

// Start the server on port 3000 (or any other desired port)
app.listen(5032, () => {
  console.log("Server is running on port 5032");
});
