import * as querystring from "querystring";

export interface IAnalyzeParameters {
  language?: string;
  visualFeatures?: Array<VisualFeature>;
  details?: Array<Detail>;
  queryString?: string;
}

export class AnalyzeParameters {
  public language?: "en" | "zh" = "en";
  public visualFeatures?: Array<VisualFeature> = [];
  public details?: Array<Detail> = [];

  constructor(parameters: AnalyzeParameters) {
    Object.assign(this, parameters);
  }

  public queryString?() {
    return querystring.stringify({
      visualFeatures: this.visualFeatures.join(),
      language: this.language
    });
  }
}

export type VisualFeature =
  | "Categories"
  | "Tags"
  | "Description"
  | "Faces"
  | "ImageType"
  | "Color"
  | "Adult";
export type Detail = "celebrities" | "landmarks";
