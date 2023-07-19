const polishLetters = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"];
const polishReplacement = ["a", "c", "e", "l", "n", "o", "s", "z", "z"];

export const replacePolishLterals = (text: string): string => {
  for (let i = 0; i < polishLetters.length; i++) {
    text = text.replaceAll(polishLetters[i], polishReplacement[i]);
  }

  return text;
};

export const dateToLocalString = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month > 9 ? month : "0" + month}-${day > 9 ? day : "0" + day}`;
};
