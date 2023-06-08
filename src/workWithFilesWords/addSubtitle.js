const fs = require("fs").promises;
const path = require("path");
const AdmZip = require("adm-zip");
const create_txt = require("./create_txt");
const words_file = require("./words_file");
const words_frequencies = require("./words_frequencies");
const stem = require("./stems");
const stems_frequencies = require("./stems_frequencies");

// Папки для зберігання файлів
const vtt_origin_dir = "/Users/andrijkozevnikov/Documents/test_arch/vtt_origin";
const vtt_zip_dir = "/Users/andrijkozevnikov/Documents/test_arch/archive";
const files_dir = "/Users/andrijkozevnikov/Documents/test_arch/files_result";

// Створюємо папки, якщо вони ще не існують
async function createDirectories() {
  await fs.mkdir(vtt_origin_dir, { recursive: true });
  await fs.mkdir(vtt_zip_dir, { recursive: true });
  await fs.mkdir(files_dir, { recursive: true });
}

// Зовнішня функція createTxt
// async function createTxt(fileName) {
//   // Ваш код для створення файлу txt на основі srt даних
//   // Використовуйте параметр fileName для роботи з поточним файлом
// }

async function processFiles() {
  await createDirectories();
  // Шлях до папки з vtt файлами
  const vtt_files_dir = "/Users/andrijkozevnikov/Documents/test_arch/vtt_files";

  let files = await fs.readdir(vtt_files_dir);
  let vtt_files = [];
  for (let file of files) {
    if (file.endsWith(".vtt")) {
      let stats = await fs.stat(path.join(vtt_files_dir, file));
      vtt_files.push({ file, mtime: stats.mtime });
    }
  }

  vtt_files.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

  for (let { file } of vtt_files) {
    const videoId = path.basename(file).split(".")[0];

    const videoDir = path.join(files_dir, videoId);
    await fs.mkdir(videoDir, { recursive: true });

    const filePath = path.join(vtt_files_dir, file);
    let vttContent = await fs.readFile(filePath, "utf8");

    let lines = vttContent.split("\n");
    let newLines = lines;
    if (lines.some((line) => line.includes("<c>"))) {
      newLines = lines.filter((line) => line.includes("<c>"));
    }

    const srtFileName = path.join(videoDir, videoId + ".srt");
    await fs.writeFile(srtFileName, newLines.join("\n"));

    console.log(`Файл ${file} був оброблений та створено файл SRT.`);

    const newVttPath = path.join(vtt_origin_dir, file);
    await fs.rename(filePath, newVttPath);

    let zip = new AdmZip();
    zip.addLocalFile(newVttPath);
    const zipFileName = path.join(vtt_zip_dir, videoId + ".zip");
    zip.writeZip(zipFileName);

    console.log(`Створено архів ${zipFileName}.`);

    // Виклик функції createTxt з іменем поточного файлу
    await create_txt(videoId);
    console.log(`файл txt створено`);

    await words_file(videoId);
    console.log(`файл words.csv для ${videoId} створено`);

    await words_frequencies(videoId);
    console.log(`файл words_frequencies_sorted.csv для ${videoId} створено`);

    await stem(videoId);
    console.log(`файл stems.csv для ${videoId} створено`);

    await stems_frequencies(videoId);
    console.log(`файл stems_frequencies_sorted.csv для ${videoId} створено`);

    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  console.log("Процес обробки файлів завершено.");
}

processFiles().catch(console.error);
