const text = require("./arrTXT.json");
const text2 = require("./twoText.json");
const allText = require("./allText.json");
const finish = require("./finidh.json");

const arr = text.split(" ");
const arr2 = text2.split(" ");
// const all = allText.split(" ");
// const finish1 = finish.split(" ");

// console.log(arr.length);
console.log(arr2.length);
// console.log(all.length / 3);
console.log(finish.length / 3);

// 3713; старий
// const differentWords = [];

// finish1.forEach((word) => {
//   if (!arr2.includes(word)) {
//     differentWords.push(word);
//   }
// });

// arr2.forEach((word) => {
//   if (!finish1.includes(word)) {
//     differentWords.push(word);
//   }
// });

// console.log(differentWords);
