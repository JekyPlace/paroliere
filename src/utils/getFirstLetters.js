import sortWordsAlphabetically from "./sortWordsAlphabetic";

export default function getFirstLetters(items, key) {
  const itemsSorted = sortWordsAlphabetically(items);
  return itemsSorted.reduce((acc, item) => {
    return acc.includes(item[key][0]) ? acc : [...acc, item[key][0]];
  }, []);
}
