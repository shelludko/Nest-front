import { useSelector } from 'react-redux';

export const CountRound = () => {
    const { cartTotalQuantity } = useSelector((state) => state.cart);
        return (
            <div className="count-round">
                <span>{cartTotalQuantity}</span>
            </div>
        );
};
