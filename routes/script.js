const DELAY_TIME = 1000;

let time = 10;
let intervalID;


function decreaseTime() {    
    --time;
    document.getElementById("Time").innerHTML = time;
    if (time === 0) {
        clearInterval(intervalID);
        document.getElementById("typeWords").readOnly = true; 
        displayFinalMessage();      
    }    
}
    
function startTimer() {
    document.getElementById("Time").innerHTML = time;
    intervalID = setInterval(decreaseTime, DELAY_TIME);    
}

let words = [];
let countWords = -1;

function saveWord() {    
    words[++countWords] = document.getElementById("typeWords").value;  
    checkWord();
    displayWords();     
}

function displayWords() {
    document.getElementById("wordsToDisplay").innerHTML = words; 
}

function checkWord() {
    let findWord = document.getElementById("typeWords").value;
    document.getElementById("typeWords").value = "";
    let wordInDictionary = 0;
    for (let i = 0; i < words.length - 1; ++i) {
        if (words[i].match(findWord)) {
            wordInDictionary = 1;
        }        
    } 
    if (wordInDictionary === 1 && words.length > 1) {
        document.getElementById("warningToDisplay").innerHTML = 
            `The word ${findWord} was already used`;
        words[countWords] = "";
        --countWords;
    } else {
        time = 10;
        clearInterval(intervalID);
        startTimer();
    }       
}

let word = "ro";
export default {word};  