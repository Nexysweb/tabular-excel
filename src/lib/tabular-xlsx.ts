import xl from "excel4node";

type Ws = any;
type Val = any;

/*const getCell = (
  ws: Ws,
  i: number,
  j: number,
  merged: { v: number; h: number } | false = false
) => {
  if (merged) {
    const mergeI = i + 1 + merged.v;
    const mergeJ = j + 1 + merged.h;
    return ws.cell(i + 1, j + 1, mergeI, mergeJ, true);
  }

  return ws.cell(i + 1, j + 1);
};

export const getMerged = (val: any) => {
  if (
    val.merged &&
    typeof val.merged.h === "number" &&
    typeof val.merged.v === "number"
  ) {
    return val.merged;
  }

  return false;
};

export const isLink = (l: string): boolean =>
  l.startsWith("http://") || l.startsWith("https://");

// https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
export const isDate = (d: any): boolean => d instanceof Date; //typeof d.getMilliseconds === 'function' && Object.prototype.toString.call(d) === '[object Date]';

export const isObjectAndNotArray = (
  c: Val[][] | { [key: string]: Val[][] }
): c is Val[][] => {
  return !(typeof c === "object" && !Array.isArray(c));
};

const worksheet = (wb: Ws, rows: Val[][], worksheetName: string) => {
  const ws = wb.addWorksheet(worksheetName);

  // go through `rows`
  rows.map((row, i) => {
    // go through `columns`
    row.map((val, j) => {
      if (typeof val !== "object") {
        // reassign val
        val = { content: val };
      }

      const merged = getMerged(val);

      const cell = getCell(ws, i, j, merged);

      switch (typeof val.content) {
        case "number":
          cell.number(val.content);
          break;
        case "string":
          if (isLink(val.content)) {
            cell.link(val.content);
          } else {
            cell.string(val.content);
          }
          break;
        case "object":
          if (isDate(val.content)) {
            cell.date(val.content);
          } else {
            cell.string(val.content);
          }
          break;
        case "boolean":
          cell.bool(val.content);
          break;
        default:
          cell.string("N/A");
          break;
      }

      if (val.style) {
        cell.style(val.style);
      }

      return true;
    });
    return true;
  });

  return true;
};*/

/**
 * creates xlsx from rows
 * @param  rows : array of arrays. Note that if the cell can be formatted by passing an objet instead of a string, e.g. {content: 'content of the string', color: 'red', bold: true}
 * @param worksheetName : name of the worksheet
 */
export const toXlsx = async (
  content: Val[][] | { [key: string]: Val[][] },
  worksheetName: string = "Sheet1"
) => {
  return;
  const wb: Ws = new xl.Workbook();

  if (!isObjectAndNotArray(content)) {
    Object.entries(content).forEach(([k, rows]) => worksheet(wb, rows, k));
  } else {
    worksheet(wb, content, worksheetName);
  }

  return await wb.writeToBuffer();
};
