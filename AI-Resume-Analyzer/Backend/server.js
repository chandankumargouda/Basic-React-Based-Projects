
require("dotenv").config();
console.log(
    "Gemini API Key:",
    process.env.GOOGLE_GENAI_API_KEY
        ? "LOADED ✅"
        : "NOT LOADED ❌"
);
const connectToDB = require("./src/config/database");

connectToDB();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
