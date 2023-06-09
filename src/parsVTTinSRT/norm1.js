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
    ); // Доданий фільтр для виключення рядків з часовими даними

  const uniqueLines = Array.from(new Set(lines));

  const textOnly = uniqueLines
    .map((line) => line.replace(/<[^>]+>/g, ""))
    .join("\n");

  fs.writeFile(outputFilePath, textOnly, "utf8", (err) => {
    if (err) {
      console.error("Помилка при записі у файл:", err);
      return;
    }

    console.log("Результати були успішно записані у файл", outputFilePath);
  });
});
