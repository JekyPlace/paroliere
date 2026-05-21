export default function getFirstLetters(items, key) {
  return items.reduce((acc, item) => {
    return acc.includes(item[key][0]) ? acc : [...acc, item[key][0]];
  }, []);
}
