export default function normalizeAssetFilename(filename) {
  const normalizedFilename = String(filename ?? "").trim().normalize("NFC");
  const extensionIndex = normalizedFilename.lastIndexOf(".");

  if (extensionIndex <= 0) {
    return normalizedFilename
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }

  const basename = normalizedFilename.slice(0, extensionIndex).trimEnd();
  const extension = normalizedFilename.slice(extensionIndex);

  return `${basename}${extension}`
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}
