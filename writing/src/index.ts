import * as request from "request";
import { config } from "./config";
import * as fileHelpers from "./fileHelpers";
import { setInterval } from "timers";
import { RecognitionResults, RecognitionResult } from "./BusinessObjects";

recognizeText("./my_handwriting.png", true);

function recognizeText(fileName: string, handwriting: boolean) {
  const requestOptions: request.CoreOptions = {
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": config.vision.key1
    },
    body: fileHelpers.readImage(__dirname + "/" + fileName)
  };

  let uri =
    config.vision.endPoint + "/recognizeText?handwriting=" + handwriting;

  request.post(uri, requestOptions, (err, response, body) => {
    if (response.headers["operation-location"]) {
      const requestUrl = response.headers["operation-location"].toString();
      let requestOptions: request.CoreOptions = {
        headers: {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": config.vision.key1
        }
      };

      const timer = setInterval(() => {
        // check status
        request.get(requestUrl, requestOptions, (err, response, body) => {
          const results = new RecognitionResults(JSON.parse(response.body));
          if (results.status === "Succeeded") {
            // and if status is completed, cancel the timer.
            clearInterval(timer);
            results.recognitionResult.lines.forEach(line => {
              console.log(line);
              line.words.forEach(word => {
                console.log(word);
              });
            });
          }
          console.log(results.recognitionResult.lines);
        });
      }, 1000);
    } else {
      console.log(body);
    }
  });
}
