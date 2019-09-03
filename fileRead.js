const fs = require("fs");

//stores the data from the txt file as an object
let hangulList = [];
let stream = fs.readFileSync("./koreanWords.txt", 'utf8');

//string manipulation to fill the array properly
hangulList = stream.split('\n');
module.exports = hangulList;