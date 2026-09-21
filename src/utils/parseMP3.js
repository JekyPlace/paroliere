const parseFile = (lang, word) => {
  const normalizedLanguage = lang.trim().toLowerCase();
  const languageDirectory = normalizedLanguage.replace(/\s+/g, "_");
  const languagePrefix = normalizedLanguage.substring(0, 3);
  const normalizedWord = word
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .normalize("NFD");

  return `${languageDirectory}/${languagePrefix}_${normalizedWord}.mp3`;
};

export default parseFile;
