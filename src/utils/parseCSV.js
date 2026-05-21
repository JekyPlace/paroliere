import Papa from "papaparse";

export default function parseCSV(csvFile) {
  const result = Papa.parse(csvFile, {
    header: true,
    skipEmptyLines: true,
  });
  if (result.errors.length) {
    throw new Error(`CSV parsing error: ${result.errors[0].message}`);
  }
  return result.data;
}
