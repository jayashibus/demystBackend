console.log("I am here");

// server.js
const express = require("express");
const bodyParser = require("body-parser");
const decisionEngine = require("./decisionEngine"); // Assuming the decision engine is implemented in a separate module
const accountingProvider = require("./accountingProvider"); // Assuming the accounting provider is implemented in a separate module

const app = express();

// Parse JSON request bodies
app.use(bodyParser.json());

// Start the server
const port = process.env.PORT || 5030;

// API endpoint for processing loan applications
app.post("/loan-application", async (req, res) => {
  try {
    // Extract loan application data from request body
    const { businessName, yearEstablished, accountingProvider, loanAmount } =
      req.body;

    // Retrieve balance sheet data from selected accounting provider
    const balanceSheet = await accountingProvider.getBalanceSheet(
      accountingProvider,
      businessName
    );

    // Apply rules to calculate pre-assessment value
    const preAssessment = decisionEngine.calculatePreAssessment(
      balanceSheet,
      loanAmount
    );

    // Prepare final output
    const output = {
      businessName,
      yearEstablished,
      summary: decisionEngine.summarizeProfitOrLoss(balanceSheet),
      preAssessment,
    };

    // Send final output to decision engine
    const decision = decisionEngine.evaluateLoanApplication(output);

    // Return decision from decision engine as response
    res.json({ decision });
  } catch (err) {
    // Handle any errors that occur during loan application processing
    res.status(500).json({ error: "Failed to process loan application" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
