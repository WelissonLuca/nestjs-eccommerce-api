export const isEmail = (email: string): boolean => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  console.log(regex.test(email));
  return regex.test(email);
};
