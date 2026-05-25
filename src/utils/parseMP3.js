const parseFile = (lang, word) => {
  return `${lang.toLowerCase().replace(" ", "_")}/${lang.toLowerCase().substring(0, 3)}_${word.toLowerCase()}.mp3`;
};

export default parseFile;
