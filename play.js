let wordList = require('./fileRead.js');
let gameStatus = 0;
let gameScore = 0;

//display side variables
const hanger = document.querySelectorAll('#hanger path');
const hangBody = document.querySelectorAll('#hanger-body path');
const textAnswer = document.querySelector('#text-answer');

// input side variables
const submitForm = document.querySelector("#submit-form");
const textShow = document.querySelector('#text-show');
const textArea = document.querySelector('#guess-input');
const errorText = document.querySelector('#error-text');
const hangulRegex = /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff][\t\x08]/g;


// Check SVG values and display on console
for(let i = 0; i < hanger.length; i++){ 
    console.log(`letter ${i+1} is ${hanger[i].getTotalLength()}`);
}

hangBody.forEach((element, index) =>{
    console.log(`letter ${index+1} is ${element.getTotalLength()}`);
})

// Reading and inputting korean words from a text file

let koreanWord; //the korean word
let englishWord; //definition of korean word in english
let guessWord; //value of your input
let randomWord; //random word generated from the array

let getWord = () =>{
    randomWord = wordList[Math.floor(Math.random() * 1001)];
    guessWord = randomWord.split('\t').map(item => item.trim());
    englishWord = guessWord[1].replace(/,/g, ', ');
    koreanWord = guessWord[0];
    submitForm.reset();
    textAnswer.innerHTML = "";
    textArea.value = "";
    textShow.innerHTML = englishWord;
    for(let i = 0; i < koreanWord.length; i++){
        textAnswer.innerHTML += "_ ";
    }
    console.log(`${koreanWord}'s length is ${koreanWord.length}`);
    console.log(textArea.value);
}
getWord();

// Check for language type
textArea.addEventListener("input", () => {
    
    console.log(textArea.value.match(hangulRegex));
    if(!(textArea.value.match(hangulRegex))){ // will perform when inputted text isn't korean
        errorText.style.opacity = "1";
        errorText.innerHTML = "*Please enter Korean characters";
        setTimeout(() => {
            errorText.style.opacity = "0"
        }, 2000)
    }else{
    }
})

// Validate guess with answer with functions
let announceStatus = () => {
    if(gameStatus === 1){
        console.log("CORRECT");
        textAnswer.innerHTML = koreanWord;
        setTimeout(getWord, 2000);
        gameStatus = 0;
    }else{
        console.log("INCORRECT");
        wrongScore++;
        drawSVG();
    }
}

submitForm.addEventListener("submit", () => {
    console.log(`${textArea.value} === ${koreanWord}?`);
    if(textArea.value === koreanWord){
        gameStatus = 1;
        gameScore++;
        console.log(gameScore);
    }else{
        gameStatus = 0;
    }
    announceStatus();
});

// Display Hangman when entered wrong answer
let wrongScore = 0;
let drawSVG = () => {
    switch(wrongScore){
        case 1:
            hanger[0].classList.add("fill-class");
            hanger[0].style.fillOpacity = '1';
            break;
        case 2:
            hanger[1].classList.add("fill-class");
            hanger[1].style.fillOpacity = '1';
            break;
        case 3:
            hangBody[1].classList.add("fill-class");
            hangBody[1].style.fillOpacity = '1';
            break;
        case 4:
            hangBody[2].classList.add("fill-class");
            hangBody[2].style.fillOpacity = '1';
            break;
        case 5: //LOSING STAGE
            console.log("LOST")
            endMessage = `YOU LOST WITH ${gameScore} POINTS`;
            hangBody[3].classList.add("fill-class");
            hangBody[3].style.fillOpacity = '1';
            textAnswer.innerHTML  = endMessage;
            textAnswer.style.fontSize = '20px';
            setTimeout(() => {
                textAnswer.style.fontSize = '50px';
                wrongScore = 0, gameScore = 0;
                getWord();
                hangBody.forEach((element) =>{
                    element.classList.remove("fill-class");
                    element.style.fillOpacity = '0';  
                });              
                hanger.forEach((element) => {
                    element.classList.remove("fill-class");
                    element.style.fillOpacity = '0';
                });
            }, 2000);
            break;    
    }
}