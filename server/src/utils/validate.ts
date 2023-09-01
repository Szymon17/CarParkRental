export const validate = {
  email: (email: string): boolean => {
    const regExp = /^([\S]+)@([\w]+)\.([\w]+)$/;

    return Boolean(email.match(regExp));
  },

  password: (password: string): boolean => {
    const regExp = /\d/;
    return Boolean(password.match(regExp) && password.length > 4 && password.length < 15);
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
