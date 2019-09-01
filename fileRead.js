const fs = require("fs");
let stream = fs.createReadStream("./koreanWords.txt");
let hangulList; //stores the data from the txt file as an object

stream.on("data", function(data) {
    let chunk = data.toString();
    let wordSplit = chunk.split("\n");
    hangulList = wordSplit;
    hangulList.forEach((element, index) => {
        element = element.split("\t");
    });
});

console.log(await hangulList);