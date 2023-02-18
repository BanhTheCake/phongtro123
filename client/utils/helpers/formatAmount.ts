const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
        return (
            (Math.floor((amount / 1000000) * 10) / 10).toLocaleString() +
            ' triệu/tháng'
        ).replace(',', '.');
    } else {
        return (amount.toLocaleString() + ' đồng/tháng').replace(',', '.');
    }
};

export default formatAmount;
