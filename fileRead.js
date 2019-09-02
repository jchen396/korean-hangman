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
