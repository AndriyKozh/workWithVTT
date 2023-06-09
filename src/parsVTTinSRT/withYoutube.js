// const webvtt = require("node-webvtt");
// const fs = require("fs");

// const parsed = webvtt.parse("Your text");

///  GREYD CODE

// const fs = require("fs");

// const inputFilePath =
//   "/Users/andrijkozevnikov/Documents/test_arch/vtt_files/_S2GKnFpdtE.en.vtt";
// const outputFilePath = "output.txt";

// fs.readFile(inputFilePath, "utf8", (err, data) => {
//   if (err) {
//     console.error("Помилка при зчитуванні файлу:", err);
//     return;
//   }

//   const lines = data
//     .split("\n")
//     .map((line) => line.trim())
//     .filter(
//       (line) => line !== "" && !line.includes("<c>") && !line.includes("-->")
//     );

//   const uniqueLines = Array.from(new Set(lines));

//   const textOnly = uniqueLines
//     .map((line) => line.replace(/<[^>]+>/g, ""))
//     .join("\n")
//     .replace(/[0-9.,?!;:]/g, "")
//     .replace(/\s+/g, " ")
//     .trim();

//   let words = textOnly.match(/[a-zA-Zа-яА-ЯіїєІЇЄ']+/g);

//   if (words === null) {
//     throw new Error("Слова не знайдені у тексті");
//   }

//   words = words.map((word) => word.toLowerCase());

//   const excludedWords = [
//     "webvtt",
//     "captions",
//     "start",
//     "kind",
//     "position",
//     "align",
//     "ru",
//     "en",
//     "ua",
//     "language",
//     "c",
//     "nbsp",
//   ];

//   const filteredWords = words.filter((word) => !excludedWords.includes(word));

//   const finalText = filteredWords.join(" ");

//   fs.writeFile(outputFilePath, finalText, "utf8", (err) => {
//     if (err) {
//       console.error("Помилка при записі у файл:", err);
//       return;
//     }

//     console.log("Результати були успішно записані у файл", outputFilePath);
//   });
// });

const fs = require("fs");

const inputFilePath =
  "/Users/andrijkozevnikov/Documents/test_arch/vtt_files/_S2GKnFpdtE.en.vtt";
const outputFilePath = "output.txt";

fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Помилка при зчитуванні файлу:", err);
    return;
  }

  const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) => line !== "" && !line.includes("<c>") && !line.includes("-->")
    );

  const uniqueLines = Array.from(new Set(lines));

  const textOnly = uniqueLines
    .map((line) => line.replace(/<[^>]+>/g, ""))
    .join("\n")
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  let words = textOnly.match(/[a-zA-Zа-яА-ЯіїєІЇЄ']+/g);

  if (words === null) {
    throw new Error("Слова не знайдені у тексті");
  }

  words = words.map((word) => word.toLowerCase());

  const excludedWords = [
    "webvtt",
    "captions",
    "start",
    "kind",
    "position",
    "align",
    "ru",
    "en",
    "ua",
    "language",
    "c",
    "nbsp",
  ];

  const filteredWords = words.filter((word) => !excludedWords.includes(word));

  const finalText = filteredWords.join(" ");

  fs.writeFile(outputFilePath, finalText, "utf8", (err) => {
    if (err) {
      console.error("Помилка при записі у файл:", err);
      return;
    }

    console.log("Результати були успішно записані у файл", outputFilePath);
  });
});
