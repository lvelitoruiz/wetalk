/* eslint-disable */
export const getFullname = (str1, str2) => {
  const names = str1 ?? '';
  const lastname = str2 ?? '';

  if (!names || !lastname) {
    return `${names}${lastname}`;
  }

  const index = names.indexOf(' ');
  if (index === -1) {
    return `${names} ${lastname}`;
  } else {
    return `${names.slice(0, index)} ${lastname}`;
  }
};
