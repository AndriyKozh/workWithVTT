const fs = require("fs");

// Функція для витягування слів з рядка і вилучення тегів, цифр і дат
function extractWords(line) {
  // Вилучаємо теги з рядка
  const tagsRemoved = line.replace(/<[^>]+>/g, "");

  // Вилучаємо цифри і дати з рядка
  const digitsAndDatesRemoved = tagsRemoved.replace(
    /\b\d+\b|\b\d{2}:\d{2}:\d{2}\.\d{3}\b|\b\d{2}:\d{2}:\d{2}\b|\b\d{2}:\d{2}\b|\b\d{2}:\d{2}:\d{2}:\d{3}\b|\b\d{4}-\d{2}-\d{2}\b/g,
    ""
  );

  // Використовуємо регулярний вираз для знаходження слів, включаючи апострофи
  const words = digitsAndDatesRemoved.match(/[\w']+/g);

  // Вилучаємо слова "align", "start" та "position"
  const filteredWords = words
    ? words.filter((word) => !["align", "start", "position"].includes(word))
    : [];

  return filteredWords;
}

// Читаємо файл VTT
fs.readFile(
  "/Users/andrijkozevnikov/Documents/test_arch/vtt_files/_S2GKnFpdtE.en.vtt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Розбиваємо текст на рядки
    const lines = data.split("\n");
    let words = [];

    // Проходимо по кожному рядку
    for (let line of lines) {
      // Викликаємо функцію extractWords для отримання слів з рядка
      const extractedWords = extractWords(line);
      if (extractedWords.length > 0) {
        // Додаємо витягнуті слова до загального масиву слів
        words = words.concat(extractedWords);
      }
    }

    // Записуємо слова у текстовий файл
    fs.writeFile("output.txt", words.join(" "), "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Файл успішно записано.");
    });
  }
);
