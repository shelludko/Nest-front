export const Count = () => {
    return (
        <div className="count">
            <button className="count__down count-button">-</button>
            <input
                type="number"
                className="count_input"
                min="1"
                max="100"
                defaultValue="1"
            />
            <button className="count__up count-button">+</button>
        </div>
    );
};
