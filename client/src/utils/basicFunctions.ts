export const today = new Date();
export const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
export const dayAfterTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);

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

export const calculateRentDays = (date_of_receipt: string | Date, date_of_return: string | Date) => {
  const timeDifference = new Date(date_of_return).getTime() - new Date(date_of_receipt).getTime();
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
};

export const calculatePrice = (productPrice: number | undefined, date_of_receipt: string | Date, date_of_return: string | Date) => {
  if (!productPrice) return NaN;

  const rentDays = calculateRentDays(date_of_receipt, date_of_return);
  return productPrice * rentDays;
};

export const isDateError = (date_of_receipt: Date, date_of_return: Date) => {
  if (date_of_receipt < tomorrow) return "Back date alert";
  else if (date_of_receipt > date_of_return) return "Receipt date is earlier than return date";
  else if (date_of_receipt.toDateString() === date_of_return.toDateString()) return "Same dates alert";
  else if (!maxDaysTimeDifferenceIsValid(date_of_receipt.getTime(), date_of_return.getTime())) return "Max different dates time alert";
  else return false;
};
