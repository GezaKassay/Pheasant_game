const express = require("express");
const app = express();
const generateContent = require("./routes/gemini.js");

app.get("/gemini", generateContent);

app.listen(3000,()=>{
    console.log("App is running on port http://localhost:3000/gemini");
});