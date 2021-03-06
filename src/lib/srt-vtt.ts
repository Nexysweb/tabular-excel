/**
 * [description]
 * @param  {[type]} lines            [description]
 * @param  {[type]} seqNLines        n lines between different sections
 * @param  {[type]} mappingFunctions map of n line:key
 * @return {[type]}                  [description]
 */

interface Struc {
  content: any[];
  idx?: number;
  timestamp?: any;
}

export const srtToJson = (lines: any[]) => {
  let row: Struc = { content: [] };
  const rows = [];
  let i = 0;

  lines.map((line) => {
    i += 1;

    if (line === "") {
      rows.push(row);
      i = 0;
      row = { content: [] };
      return true;
    }

    if (i === 1) {
      row.idx = Number(line);
      return true;
    }

    if (i === 2) {
      row.timestamp = line;
      return true;
    }

    row.content.push(line);

    return true;
  });

  rows.push(row);
  return rows;
};

export const jsonUnitToVtt = (j: Struc) => {
  return [
    "",
    j.timestamp + " line:-1",
    j.content.map((x) => " " + x + " ").join("\n"),
  ].join("\n");
};

export const jsonToVtt = (j: Struc[]) => {
  const r = j.map(jsonUnitToVtt);

  const a = ["WEBVTT"].concat(r);

  const s = a.join("\n");

  return s; //.trim();
};
