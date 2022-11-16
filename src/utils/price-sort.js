export const PriceSort = (type = 0, array = []) => {
    if (type === 1) {
        const lowToHigh = [...array].sort((a, b) => a.price - b.price);
        return lowToHigh;
    }
    if (type === 2) {
        const highToLow = [...array].sort((a, b) => b.price - a.price);
        return highToLow;
    }

    return array;
};
