const formatValue = (value: number, formatNumber: number) => {
    return Math.round(value / formatNumber);
};

export default formatValue;
