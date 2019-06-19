export class RecognitionResults {
  public status: string;
  public recognitionResult: RecognitionResult;

  constructor(recognitionResults: RecognitionResults) {
    Object.assign(this, recognitionResults);
  }
}

export class Word {
  public boundingBox: Array<string>;
  public text: string;
}

export class Line extends Word {
  public words: Array<Word>;
}

export class RecognitionResult {
  public lines: Array<Line>;
}
