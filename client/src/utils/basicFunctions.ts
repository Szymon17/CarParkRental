const polishLetters = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"];
const polishReplacement = ["a", "c", "e", "l", "n", "o", "s", "z", "z"];

export const today = new Date();
export const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
export const dayAfterTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);

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

export const validate = {
  email: (email: string): boolean => {
    const regExp = /^([\S]+)@([\w]+)\.([\w]+)$/;

    return Boolean(email.match(regExp));
  },

  password: (password: string, confirmPassword: string): boolean => {
    const regExp = /\d/;
    return Boolean(password.match(regExp) && password === confirmPassword && password.length > 4 && password.length < 15);
  },

  name: (name: string): boolean => {
    const regExp = /[\d\s!@#$%^&*()_+{}:;"'>?/.,<\\|]+/;
    return Boolean(name.length > 2 && !name.match(regExp));
  },

  phoneNumber: (phoneNumber: string): boolean => {
    const regExp = /^[\d]{9}$/;
    return Boolean(phoneNumber.match(regExp));
  },
};

export const maxDaysTimeDifferenceIsValid = (receiptDateTime: number, returnDateTime: number, days: number = 10) => {
  const daysMs = 1000 * 60 * 60 * 24 * days;
  const timeDifference = returnDateTime - receiptDateTime;

  return daysMs > timeDifference;
};
