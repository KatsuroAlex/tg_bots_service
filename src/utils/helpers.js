export const getCategoryName = (inputString) => {
  const parts = inputString.split(': ');

  if (parts.length === 2 && parts[0] === 'Категория') {
    return parts[1];
  }

  return 'Invalid input format';
};

export const wrapAuthorName = (author) => {
  return `@${author}`;
};
