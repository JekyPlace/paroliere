import Papa from "papaparse";

export default function parseCSV(csvFile) {
  const result = Papa.parse(csvFile, {
    header: true,
    skipEmptyLines: true,
  });
  if (result.errors.length) {
    throw new Error(`CSV parsing error: ${result.errors[0].message}`);
  }

  return result.data.map((row) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key.trim().normalize("NFC"),
        typeof value === "string" ? value.trim().normalize("NFC") : value,
      ]),
    ),
  );
}
