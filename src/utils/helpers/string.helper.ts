export const hidePartOfText = (str: string) => {
  return str.replace(/.(?=.{3,}$)/g, '*');
};
