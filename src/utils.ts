import { toXlsx } from "./lib/tabular-xlsx";
import * as Csv from "./lib/csv";
import { serveFile } from "./lib/utils";

export const formatJsArray = (js: any) => {
  if (!Array.isArray(js) || js.length === 0) {
    return [];
  }

  return (
    "[\n\t" +
    js
      .map((row) => {
        return JSON.stringify(row);
      })
      .reduce((a, b) => a + ",\n\t" + b) +
    "\n]"
  );
};

export const jsonBeautify = (jsContent: any) =>
  JSON.stringify(jsContent, null, "  ");

export const toExport = (
  content: string,
  workbookName = "MyWorkBook"
): void => {
  const jsContent = JSON.parse(content);

  toXlsx(jsContent, workbookName).then((x) => {
    serveFile(
      x,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "sample.xlsx"
    );
  });
};

export const toExportTxt = (txt: string) =>
  serveFile(txt, "application/octet-stream", "sample.txt");

export const toCsv = (content: any) => {
  const jsContent = JSON.parse(content);
  const x = Csv.to(jsContent);
  serveFile(x, "application/csv", "sample.csv");
};

/**
 * read file asynchronously
 * @param {*} file
 * some references regrding files upload in HTML
 * @see https://stackoverflow.com/questions/24843508/filereader-error-the-object-is-already-busy-reading-blobs
 * @see https://stackoverflow.com/questions/25333488/why-isnt-the-filelist-object-an-array
 * @see https://stackoverflow.com/questions/1593225/how-to-select-multiple-files-with-input-type-file
 */
export const readFile = (file: File) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onloadend = (a) => {
      const data = fileReader.result;
      resolve(data);
    };

    fileReader.readAsText(file);
  });
};
