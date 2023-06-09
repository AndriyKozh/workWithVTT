// const webvtt = require("node-webvtt");
// const fs = require("fs");

// let data = fs.readFileSync(
//   "/Users/andrijkozevnikov/Documents/test_arch/vtt_files/_S2GKnFpdtE.en.vtt",
//   "utf8"
// );

// let parsed = webvtt.parse(data);
// let output = "";
// let previousText = "";
// let count = 1;

// parsed.cues.forEach((cue) => {
//   if (cue.text != previousText) {
//     output += count + "\n";
//     output += formatTime(cue.start) + " --> " + formatTime(cue.end) + "\n";
//     output += cue.text + "\n\n";
//     previousText = cue.text;
//     count++;
//   }
// });

// fs.writeFileSync("output.srt", output);

// function formatTime(time) {
//   let date = new Date(null);
//   date.setSeconds(time);
//   let result = date.toISOString().substr(11, 12);
//   return result.endsWith("00") ? result + "0" : result;
// }

////////////////////  1

// const fs = require("fs");
// const { WebVTTParser, WebVTTCue } = require("webvtt-parser");

// const parser = new WebVTTParser();

// fs.readFile(
//   "/Users/andrijkozevnikov/Documents/test_arch/vtt_files/_S2GKnFpdtE.en.vtt",
//   "utf8",
//   function (err, data) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     const parsed = parser.parse(data);
//     let previousText = "";
//     const cleanCues = parsed.cues
//       .map((cue) => {
//         // Remove HTML tags and extra whitespaces
//         cue.text = cue.text
//           .replace(/<[^>]*>?/gm, "")
//           .replace(/\s\s+/g, " ")
//           .trim();
//         return cue;
//       })
//       .filter((cue) => {
//         if (cue.text !== previousText) {
//           previousText = cue.text;
//           return cue;
//         }
//       });

//     const srtData = cleanCues
//       .map((cue, index) => {
//         let cueTime = `${formatTime(cue.startTime)} --> ${formatTime(
//           cue.endTime
//         )}`;
//         return `${index + 1}\n${cueTime}\n${cue.text}\n`;
//       })
//       .join("\n");

//     fs.writeFile("output.srt", srtData, (err) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log("The file was saved!");
//     });
//   }
// );

// function formatTime(time) {
//   let date = new Date(null);
//   date.setMilliseconds(time * 1000); // specify value for SECONDS here
//   let timeString = date.toISOString().substr(11, 12);
//   return timeString.replace(".", ",");
// }

////////////////////  2
const fs = require("fs");
const { WebVTTParser, WebVTTCue } = require("webvtt-parser");

const parser = new WebVTTParser();

fs.readFile(
  "/Users/andrijkozevnikov/Documents/test_arch/vtt_files/_S2GKnFpdtE.en.vtt",
  "utf8",
  function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const parsed = parser.parse(data);
    let previousText = "";
    let previousCue = null;
    const cleanCues = parsed.cues
      .map((cue) => {
        // Remove HTML tags and extra whitespaces
        cue.text = cue.text
          .replace(/<[^>]*>?/gm, "")
          .replace(/\s\s+/g, " ")
          .trim();
        return cue;
      })
      .filter((cue) => {
        if (cue.text.startsWith(previousText) && previousCue != null) {
          previousCue.endTime = cue.endTime;
          return false;
        } else {
          previousText = cue.text;
          previousCue = cue;
          return true;
        }
      });

    const srtData = cleanCues
      .map((cue, index) => {
        let cueTime = `${formatTime(cue.startTime)} --> ${formatTime(
          cue.endTime
        )}`;
        return `${index + 1}\n${cueTime}\n${cue.text}\n`;
      })
      .join("\n");

    fs.writeFile("output.srt", srtData, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("The file was saved!");
    });
  }
);

function formatTime(time) {
  let date = new Date(null);
  date.setMilliseconds(time * 1000); // specify value for SECONDS here
  let timeString = date.toISOString().substr(11, 12);
  return timeString.replace(".", ",");
}
