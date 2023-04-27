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
  const { name, email, bname, lamount, provider } = req.body;

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

// Define the POST route for processing loan applications
app.post("/api/loan-application", (req, res) => {
  // Extract business details from the request body
  const { businessName, yearEstablished, loanAmount } = req.body;

  // Fetch the balance sheet data from accounting software (dummy data for simulation)
  const balanceSheet = [
    { year: 2020, month: 12, profitOrLoss: 250000, assetsValue: 1234 },
    { year: 2020, month: 11, profitOrLoss: 1150, assetsValue: 5789 },
    { year: 2020, month: 10, profitOrLoss: 2500, assetsValue: 22345 },
    { year: 2020, month: 9, profitOrLoss: -187000, assetsValue: 223452 },
  ];

  // const balanceSheet = [
  //   { year: 2022, month: 12, profitOrLoss: -250000, assetsValue: 1234 },
  //   { year: 2022, month: 11, profitOrLoss: 1150, assetsValue: 5789 },
  //   { year: 2022, month: 10, profitOrLoss: 2500, assetsValue: 22345 },
  //   { year: 2022, month: 9, profitOrLoss: -187000, assetsValue: 223452 },
  //   { year: 2022, month: 8, profitOrLoss: -187000, assetsValue: 223452 },
  //   { year: 2022, month: 7, profitOrLoss: -187000, assetsValue: 223452 },
  //   { year: 2022, month: 6, profitOrLoss: -187000, assetsValue: 223452 },
  //   { year: 2022, month: 5, profitOrLoss: -2500, assetsValue: 22345 },
  //   { year: 2022, month: 4, profitOrLoss: 187000, assetsValue: 223452 },
  //   { year: 2022, month: 3, profitOrLoss: 187000, assetsValue: 223452 },
  //   { year: 2022, month: 2, profitOrLoss: 187000, assetsValue: 223452 },
  //   { year: 2022, month: 1, profitOrLoss: 187000, assetsValue: 223452 },
  //   { year: 2023, month: 1, profitOrLoss: -18000, assetsValue: 223452 },
  //   { year: 2023, month: 2, profitOrLoss: 18000, assetsValue: 223452 },
  //   { year: 2023, month: 3, profitOrLoss: 18000, assetsValue: 223452 },
  // ];

  // Calculate the pre-assessment value based on the balance sheet data
  let preAssessment = 20; // Default value
  const currentDate = new Date();
  const twelveMonthsAgo = new Date(currentDate);
  twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);
  const balanceSheetData = balanceSheet.filter(
    (entry) => new Date(entry.year, entry.month - 1) >= twelveMonthsAgo
  );
  const profitOrLossSum = balanceSheetData.reduce(
    (sum, entry) => sum + entry.profitOrLoss,
    0
  );
  const averageAssetsValue =
    balanceSheetData.reduce((sum, entry) => sum + entry.assetsValue, 0) /
    balanceSheetData.length;

  if (profitOrLossSum > 0) {
    preAssessment = 60;
  } else if (averageAssetsValue > loanAmount) {
    preAssessment = 100;
  }

  // Prepare the response and send it back to the frontend
  const decision = {
    businessName,
    yearEstablished,
    preAssessment,
    profitOrLossSum,
    balanceSheetData,
    averageAssetsValue,
    twelveMonthsAgo,
  };
  res.json({ decision });
});

// Start the server on port 3000 (or any other desired port)
app.listen(5032, () => {
  console.log("Server is running on port 5032");
});
