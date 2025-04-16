import CartItem from './CartItem';
import './Cart.css';

function Cart({ cartItems, removeFromCart, updateQuantity, onChange }) {
    return (
        <>
            {cartItems.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <div className='cart'>
                    {cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            removeFromCart={removeFromCart}
                            updateQuantity={updateQuantity}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Cart;