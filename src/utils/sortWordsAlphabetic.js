export default function sortWordsAlphabetically(words) {
  return [...words].sort((a, b) =>
    a.Italiano.localeCompare(b.Italiano, "it", {
      sensitivity: "base",
    }),
  );
}
