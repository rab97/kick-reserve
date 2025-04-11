import pluralize from 'pluralize';

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getScopeName = (str: string) => pluralize(str);
