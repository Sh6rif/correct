const express = require("express");
const { spawn, spawnSync } = require("child_process");
const cors = require("cors"); // Import CORS middleware
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("views"));

// Define a route to render a page
app.get("/", (req, res) => {
  // Render the 'index.ejs' template
  res.render("spell-correct.ejs");
});

app.post("/correct", async (req, res) => {
  var inputText = req.body.text;
  console.log(inputText);

  // Execute the Python script

  const pythonProcess = spawn("pipenv", [
    "run",
    "python",
    "spell_correction.py",
    inputText,
  ]);

  let correctedText = "";

  // Collect data from the Python process
  pythonProcess.stdout.on("data", (data) => {
    correctedText += data.toString();
  });

  // Handle errors
  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  // When the process exits
  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
    res.json(correctedText.trim()); // Send the corrected text back to the client
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
