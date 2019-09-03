const wordList = require('./fileRead.js');
const hanger = document.querySelectorAll('#hanger path');
const hangBody = document.querySelectorAll('#hanger-body path');
const textShow = document.querySelector('#text-show');
const hangulRegex = /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g;
let textArea = document.querySelector('#guess-input');
let errorText = document.querySelector('#error-text');

// Check SVG values and display on console
for(let i = 0; i < hanger.length; i++){ 
    console.log(`letter ${i+1} is ${hanger[i].getTotalLength()}`);
}

hangBody.forEach((element, index) =>{
    console.log(`letter ${index+1} is ${element.getTotalLength()}`);
})

// Check for language type
textArea.addEventListener("input", () => {
    
    console.log(textArea.value.match(hangulRegex));
    if(textArea.value.match(hangulRegex)){
        
    }else{
        errorText.style.opacity = "1";
        errorText.innerHTML = "*Please enter Korean characters";
        setTimeout(() => {
            errorText.style.opacity = "0"
        }, 2000)
    }
})

// Reading and inputting korean words from a text file
let guessWord = wordList.split('\t').map(item => item.trim());
englishWord = guessWord[1];
koreanWord = guessWord[0];
textShow.innerHTML = englishWord;
console.log(`${koreanWord}'s length is ${koreanWord.length}`);
