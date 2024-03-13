const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("views"));

// Define route for private resource endpoint
app.get("/private-resource", (req, res) => {
  // Set CORS headers to allow cross-origin requests and access to private network resources
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET"); // Allow only GET requests
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  ); // Allow certain headers
  res.header("Access-Control-Allow-Private-Network", "true"); // Set this header for private network access

  // Respond with JSON containing the private resource data
  res.json({ data: "Private resource data" });
});

// Route for correcting text
app.post("/correct", async (req, res) => {
  try {
    const inputText = req.body.text;

    const pythonProcess = spawn("python", [
      "views/py/spell_correction.py",
      inputText,
    ]);

    let correctedText = "";

    pythonProcess.stdout.on("data", (data) => {
      correctedText += data;
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
      console.log(correctedText);
      res.json({ correctedText }); // Send the corrected text back to the client
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
