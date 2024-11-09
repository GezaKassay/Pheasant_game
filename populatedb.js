console.log(
    'This script populates some test words to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.cojoign.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"'
  );  
 
 // Get arguments passed on command line
  const userArgs = process.argv.slice(2);

  const Pheasant = require("./models/pheasant");

  const pheasants = [];

  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createPheasants();  
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }

  async function pheasantCreate(index, word) {
    const pheasant = new Pheasant({ word: word });
    await pheasant.save();
    pheasants[index] = pheasant;
    console.log(`Added word: ${word}`);
  }

  async function createPheasants() {
    console.log("Adding words");
    await Promise.all([
      pheasantCreate(0, "test"),
      pheasantCreate(1, "standard"),      
    ]);
  }

  //node populatedb <your MongoDB url>
