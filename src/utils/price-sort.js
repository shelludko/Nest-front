const PriceSort = (type, [...items], func) => {
    if (type === 1) {
        const lowToHigh = [...items].sort((a, b) => a.price - b.price);
        func(lowToHigh);
    }
    if (type === 2) {
        const highToLow = [...items].sort((a, b) => b.price - a.price);
        func(highToLow);
    }
    if (type === 3) {
        return [...items];
    }
};
 
export default PriceSort;
