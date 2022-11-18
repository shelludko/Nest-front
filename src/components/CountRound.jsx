import { useSelector } from 'react-redux';

export const CountRound = () => {
    const cart = useSelector((state) => state.cart.cart);
    if (cart.length) {
        return <div className="count-round"><span>{cart.length}</span></div>;
    }
};
