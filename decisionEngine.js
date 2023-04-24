// Import express and create an instance of the express app
const express = require("express");
const app = express();
app.use(express.json());

// Define the POST route for processing loan applications
app.post("/loan-application", (req, res) => {
  // Extract business details from the request body
  const { businessName, yearEstablished, loanAmount } = req.body;

  // Fetch the balance sheet data from accounting software (dummy data for simulation)
  const balanceSheet = [
    { year: 2020, month: 12, profitOrLoss: 250000, assetsValue: 1234 },
    { year: 2020, month: 11, profitOrLoss: 1150, assetsValue: 5789 },
    { year: 2020, month: 10, profitOrLoss: 2500, assetsValue: 22345 },
    { year: 2020, month: 9, profitOrLoss: -187000, assetsValue: 223452 },
  ];

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
  const decision = { businessName, yearEstablished, preAssessment };
  res.json({ decision });
});

// Start the server on port 3000 (or any other desired port)
app.listen(5031, () => {
  console.log("Server is running on port 5031");
});
