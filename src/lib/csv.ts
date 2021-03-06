export const to = (rows: any[][], separator = ",") => {
  return rows
    .map((row) => {
      return row
        .map((x) => JSON.stringify(x))
        .reduce((a, b) => a + separator + b);
    })
    .reduce((a, b) => a + "\n" + b);
};
