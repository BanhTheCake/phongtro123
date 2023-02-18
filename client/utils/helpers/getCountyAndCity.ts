const getCountyAndCity = (inputString: string = '') => {
    if (!inputString) return '';
    const arrString = inputString.split(',');
    const lengthOfArr = arrString.length;
    return `${arrString[lengthOfArr - 2].trim()}, ${arrString[
        lengthOfArr - 1
    ].trim()}`;
};

export default getCountyAndCity;
