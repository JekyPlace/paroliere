import Papa from "papaparse";

export default async function parseCSV(csvFile) {
  try {
    const result = await Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
    });
    if (result.errors.length) {
      throw new Error(`CSV parsing error: ${result.errors[0].message}`);
    }
    return result.data;
  } catch (error) {
    console.error("Error parsing CSV:", error);
  }
}
