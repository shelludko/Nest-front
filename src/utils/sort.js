export const Sort = (type, array) => {
    if (type === 1) {
        const lowToHigh = [...array].sort((a, b) => a.price - b.price);
        return lowToHigh;
    }

    if (type === 2) {
        const AtoZ = [...array].sort((a, b) => b.price - a.price);
        return AtoZ;
    }

    if (type === 3) {
        const ZtoA = [...array].sort((a, b) => a.name.localeCompare(b.name));
        return ZtoA;
    }

    if (type === 4) {
        const highToLow = [...array].sort((a, b) => b.name.localeCompare(a.name));
        return highToLow;
    }

    return array;
};
