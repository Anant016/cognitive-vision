import * as request from "request";
import { config } from "./config";
import * as fileHelpers from "./fileHelpers";
import * as fs from "fs";
import { AnalyzeParameters, IAnalyzeParameters } from "./BusinessObjects";
import * as querystring from "querystring";

analyzeFaces("./couple.jpg");

function analyzeFaces(fileName: string) {
  const requestOptions: request.CoreOptions = {
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": config.face.key1
    },
    body: fileHelpers.readImage(__dirname + "/" + fileName)
  };

  const params = {
    returnFaceId: "true",
    returnFaceLandmarks: "false",
    returnFaceAttributes:
      "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise"
  };

  let uri = config.face.endPoint + "/detect?" + querystring.stringify(params);

  request.post(uri, requestOptions, (err, response, body) => {
    console.log(body);
  });
}

// generateThumbnail("./dog.jpg");

function generateThumbnail(fileName: string) {
  const requestOptions: request.CoreOptions = {
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": config.vision.key1
    },
    body: fileHelpers.readImage(__dirname + "/" + fileName)
  };

  let uri =
    config.vision.endPoint +
    "/generateThumbnail?width=50&height=50&smartCropping=true";

  request
    .post(uri, requestOptions)
    .pipe(fs.createWriteStream(__dirname + "/output.jpeg"));
}

// analyzeImage(
//   "./people.jpg",
//   new AnalyzeParameters({
//     //visualFeatures: ["Tags", "Categories"]
//     details: ["landmarks"]
//   })
// );

function analyzeImage(fileName: string, params: AnalyzeParameters) {
  const requestOptions: request.CoreOptions = {
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": config.vision.key1
    },
    body: fileHelpers.readImage(__dirname + "/" + fileName)
  };

  let uri = config.vision.endPoint;

  if (params.details.length) {
    uri =
      config.vision.endPoint +
      "/models/" +
      params.details.join() +
      "/analyze?" +
      params.queryString();
  } else {
    uri = uri + "/analyze?" + params.queryString();
  }

  request.post(uri, requestOptions, (err, response, body) => {
    console.log(body);
  });
}

// describeImage('./dog.jpg');

function describeImage(fileName: string) {
  const requestOptions: request.CoreOptions = {
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": config.vision.key1
    },
    body: fileHelpers.readImage(__dirname + "/" + fileName)
  };

  let uri = config.vision.endPoint;
  uri = uri + "/describe?maxCandidates=3";

  request.post(uri, requestOptions, (err, response, body) => {
    console.log(body);
  });
}
