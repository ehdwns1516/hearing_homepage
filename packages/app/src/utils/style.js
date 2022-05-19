const getColor = (color) => {
  return ({ theme }) => theme.color[color];
};

export { getColor };
