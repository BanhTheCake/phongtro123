const formatPriceToNumber = (string: string) => {
  if (string.includes('triệu')) {
    const price = (string.split(' ')[0].replace('.', '') + '000000').slice(
      0,
      7,
    );
    return parseInt(price);
  }

  if (string.includes('đồng')) {
    const price = string.split(' ')[0].replace('.', '');
    return parseInt(price);
  }
  return 0;
};

export default formatPriceToNumber;
