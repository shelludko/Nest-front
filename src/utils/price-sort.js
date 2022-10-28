const PriceSort = (type, [...items]) => {
    if (type === 1) {
        const lowToHigh = [...items].sort((a, b) => a.price - b.price);
        return lowToHigh;
    }
    if (type === 2) {
        const highToLow = [...items].sort((a, b) => b.price - a.price);
        return highToLow;
    }
    if (type === 3) {
        return [...items];
    }
};
 
export default PriceSort;
