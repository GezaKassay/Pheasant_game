const express = require("express");
const app = express();
const path = require('path');
const pheasant_controller = require("./controllers/pheasantcontroller");
const generateContent = require("./routes/gemini.js");

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://<>@cluster0.mxmvh.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/", pheasant_controller.pheasant_create_get);
app.post("/", pheasant_controller.pheasant_create_post);

app.get("/gemini", generateContent);

app.listen(3000,()=>{
    console.log("App is running on port http://localhost:3000/gemini");
});