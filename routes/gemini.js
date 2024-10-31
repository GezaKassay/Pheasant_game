const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const generateContent = async (req,res)=>{

    try{  
        const {word} = require('./script').default;      
        const prompt = `Write me words longer than 2 letters that starts with following letters: ${word}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.send(text);
    }
    catch(err){
        console.log(err);
        res.send("Unexpected Error!!!");
    }
}

module.exports = generateContent;

// cd OneDrive - Wolters Kluwer\Documents\GitHub\Pheasant_game