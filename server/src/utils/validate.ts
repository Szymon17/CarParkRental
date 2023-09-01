export const validate = {
  email: (email: string): boolean => {
    const regExp = /^([\S]+)@([\w]+)\.([\w]+)$/;
    if (typeof email === "string") return Boolean(email.match(regExp));
    else return false;
  },

  password: (password: string): boolean => {
    const regExp = /\d/;
    if (typeof password === "string") return Boolean(password.match(regExp) && password.length > 4 && password.length < 15);
    else return false;
  },

  name: (name: string): boolean => {
    const regExp = /[\d\s!@#$%^&*()_+{}:;"'>?/.,<\\|]+/;
    if (typeof name === "string") return Boolean(name.length > 2 && !name.match(regExp));
    else return false;
  },

  phoneNumber: (phoneNumber: string): boolean => {
    const regExp = /^[\d]{9}$/;
    if (typeof phoneNumber === "string") return Boolean(phoneNumber.match(regExp));
    else return false;
  },
};
