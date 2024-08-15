import * as results from "../../results.json";

const getAllResults = () => {
  return results;
};

const formatOrdinalNumber = (n) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

export { getAllResults, formatOrdinalNumber };
