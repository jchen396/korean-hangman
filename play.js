const wordList = require('./fileRead.js');
let gameStatus = 0;

//display side variables
const hanger = document.querySelectorAll('#hanger path');
const hangBody = document.querySelectorAll('#hanger-body path');
const textAnswer = document.querySelector('#text-answer');

// input side variables
const submitForm = document.querySelector("#submit-form");
const textShow = document.querySelector('#text-show');
const textArea = document.querySelector('#guess-input');
const errorText = document.querySelector('#error-text');
const hangulRegex = /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g;


// Check SVG values and display on console
for(let i = 0; i < hanger.length; i++){ 
    console.log(`letter ${i+1} is ${hanger[i].getTotalLength()}`);
}

hangBody.forEach((element, index) =>{
    console.log(`letter ${index+1} is ${element.getTotalLength()}`);
})

// Reading and inputting korean words from a text file
let guessWord = wordList.split('\t').map(item => item.trim());
let englishWord = guessWord[1].replace(/,/g, ', ');
let koreanWord = guessWord[0];
textShow.innerHTML = englishWord;
for(let i = 0; i < koreanWord.length; i++){
    textAnswer.innerHTML += "_ ";
}
console.log(`${koreanWord}'s length is ${koreanWord.length}`);
console.log(textArea.value);

// Check for language type
textArea.addEventListener("input", () => {
    
    console.log(textArea.value.match(hangulRegex));
    if(textArea.value.match(hangulRegex)){
        submitForm.addEventListener('submit', wordCheck());
        announceStatus();
    }else{
        errorText.style.opacity = "1";
        errorText.innerHTML = "*Please enter Korean characters";
        setTimeout(() => {
            errorText.style.opacity = "0"
        }, 2000)
    }
})

// Validate guess with answer with functions
let wordCheck = () => {
    if(koreanWord === textArea.value){
        gameStatus = 1;
    }else{
        gameStatus = 0;
    }
};

let announceStatus = () => {
    if(gameStatus === 1){
        console.log("CORRECT");
        textAnswer.innerHTML = koreanWord;
    }else{
        console.log("ERROR");
    }
};