let wordList = require('./fileRead.js');
let gameStatus = 1; // 0=incorrect 1=neutral 2=correct
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
const scoreText = document.querySelector('#show-score');
const hangulRegex = /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff][\t\x08]/g;


// Check SVG values and display on console
for(let i = 0; i < hanger.length; i++){ 
    console.log(`letter ${i+1} is ${hanger[i].getTotalLength()}`);
}

hangBody.forEach((element, index) =>{
    console.log(`letter ${index+1} is ${element.getTotalLength()}`);
})

// Reading and inputting korean words from a text file

let koreanWord; // the korean word
let englishWord; // definition of korean word in english
let guessWord; // value of your input
let randomWord; // random word generated from the array
let charArray; // an array of contained characters from the korean word
let answerArray; //an array for the display of answer

// RESET GAME
let getWord = () =>{
    answerArray = [];
    randomWord = wordList[Math.floor(Math.random() * 1001)];
    console.log(randomWord);
    guessWord = randomWord.split('\t').map(item => item.trim());
    englishWord = guessWord[1].replace(/,/g, ', ');
    koreanWord = guessWord[0];
    charArray = Array.from(koreanWord);
    submitForm.reset();
    textAnswer.innerHTML = "";
    textArea.value = "";
    textShow.innerHTML = englishWord;
    for(let i = 0; i < koreanWord.length; i++){
        answerArray[i] = " _";
    }
    textAnswer.innerHTML = answerArray.join("");
}
getWord();

// Check for language type
textArea.addEventListener("input", () => {
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
let winResult = () => {
    gameStatus = 2;
    gameScore++;
    displayScore();
}

// Perform actions based on answer status 
let announceStatus = () => {
    if(gameStatus === 2){
        textAnswer.innerHTML = koreanWord;
        setTimeout(getWord, 2000);
        gameStatus = 0;
    }
    else if(gameStatus === 1){
    }else{
        wrongScore++;
        drawSVG();
    }
    textArea.value = "";
}

// When the answer is submitted
submitForm.addEventListener("submit", () => {
    if(textArea.value === koreanWord){
        winResult();
    }
    else if(charArray.includes(textArea.value)){
        gameStatus = 1;
        matchChar();
        console.log(charArray.every((element, index) => element === answerArray[index]));
        if(charArray.every((element, index) => element === answerArray[index])){
            winResult();
        }
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
            break;
        case 2:
            hanger[1].classList.add("fill-class");
            break;
        case 3:
            hangBody[1].classList.add("fill-class");
            break;
        case 4:
            hangBody[2].classList.add("fill-class");
            break;
        case 5: //LOSING STAGE
            hangBody.forEach((element) =>{
                    element.style.fillOpacity = '1';  
            });              
            hanger.forEach((element) => {
                    element.style.fillOpacity = '1';
            });
            endMessage = `YOU LOST WITH ${gameScore} POINTS`;
            hangBody[3].classList.add("fill-class");
            hangBody[3].style.fillOpacity = '1';
            textAnswer.style.fontFamily = 'Righteous', 'cursive';
            textAnswer.innerHTML  = koreanWord;
            scoreText.innerHTML = endMessage;
            scoreText.style.color = '#AE00FF';
            setTimeout(() => {
                scoreText.innerHTML = "";
                scoreText.style.color = '#2c444d';
                textAnswer.style.fontFamily = 'auto';
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
            }, 5000);
            break;    
    }
}

// Break word into characters
let matchChar = () => {
    let findChar = charArray.find((element) => {
        return element === textArea.value;
    })
    answerArray.splice(charArray.indexOf(findChar), 1, `${findChar}`);
    textAnswer.innerHTML = answerArray.join("");
}

// Keep score of user's win streaks
let displayScore = () => {
    scoreText.innerHTML = `Current Score: ${gameScore}`;
}