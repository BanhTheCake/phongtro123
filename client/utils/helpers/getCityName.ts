const getCityName = (provinceValue: string) => {
    if (provinceValue.includes('Tỉnh')) {
        return provinceValue.replace('Tỉnh', '').trim();
    }
    if (provinceValue.includes('Thành phố')) {
        return provinceValue.replace('Thành phố', '').trim();
    }
    return provinceValue;
};

export default getCityName;
