const fs = require("fs").promises;
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

async function wordsFile(fileName) {
  try {
    const filePath = `/Users/andrijkozevnikov/Documents/ProjectYoutube/videos_files_words/files/${fileName}/${fileName}.txt`;

    const data = await fs.readFile(filePath, "utf8");

    // Розділяємо текст на слова за допомогою пробілів
    const words = data.split(" ");

    // Записуємо дані в CSV формат
    const csvWriter = createCsvWriter({
      path: `/Users/andrijkozevnikov/Documents/ProjectYoutube/videos_files_words/files/${fileName}/words.csv`,
      header: ["word"],
    });

    const records = words.map((word) => ({ word }));

    await csvWriter.writeRecords(records);
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    throw error;
  }
}

module.exports = wordsFile;
