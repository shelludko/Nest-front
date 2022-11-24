import { useDispatch } from 'react-redux';
import { decreaseCartItem } from '../../store/cart/reducer';

export const Count = ({ cartItem }) => {
    const { itemQuantity } = cartItem;
    const dispatch = useDispatch();

    const handleDecreaseCartItem = (cartItem) => { 
        dispatch(decreaseCartItem(cartItem));
    };
    return (
        <div className="count">
            <button
                onClick={() => handleDecreaseCartItem(cartItem)}
                className="count__down count-button"
            >
                -
            </button>
            <input
                type="number"
                className="count_input"
                min="1"
                max="100"
                defaultValue={itemQuantity}
            />
            <button className="count__up count-button">+</button>
        </div>
    );
};
