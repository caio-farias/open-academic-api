export const generateFilter = (queries, output, generateQuery) => {
  const keys = Object.keys(queries);
  keys.map((key) => {
    if (queries[key] != undefined)
      output[key] = generateQuery(key, queries[key]);
  });

  return output;
};

export const generateNextPath = (
  path: string,
  match: string,
  newValue: string,
) => {
  return path.includes(match)
    ? path.replace(match, newValue)
    : path + `&${newValue}`;
};
