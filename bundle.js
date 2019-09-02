(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
const fs = require("fs");
let stream = fs.createReadStream("./koreanWords.txt");
let hangulList = []; //stores the data from the txt file as an object

module.exports = new Promise((resolve, reject) => {
    stream.on("data", function(data) {
        let chunk = data.toString();
        let wordSplit = chunk.split("\n");
        hangulList = wordSplit;
        hangulList.forEach((element, index) => {
            element = element.split("\t");
            resolve("WORD LIST UPDATED");
        })
    })
    if(typeof hangulList === 'undefined'){
        reject("WORD LIST EMPTY");
    }
}).then(() => {
    console.log(hangulList[Math.floor(Math.random() * 100) + 1]);
})

},{"fs":1}],3:[function(require,module,exports){
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

// Reading and inputting korean words from a text file
let guessString = wordList.then();
textShow.innerHTML = "hi";
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
},{"./fileRead.js":2}]},{},[3]);
