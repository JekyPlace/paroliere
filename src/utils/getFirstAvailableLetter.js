import getFirstLetters from "./getFirstLetters";

export default function getFirstAvailableLetter(words) {
  if (!words || words.length === 0) return null;
  const firstLetters = getFirstLetters(words, "Italiano");

  return firstLetters[0] || null; // Return the first letter or null if there are no letters
}
