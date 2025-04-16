import { useState } from 'react';
import basketImg from '../img/basket.png';
import pencil from '../img/pencil.jpg';

function CartItem({ item, removeFromCart }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showCardNumber, setShowCardNumber] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('В пункт выдачи');
    const [cardNumber, setCardNumber] = useState('');
    const [quantity, setQuantity] = useState(item.quantity);

    const handleBuyClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handlePaymentMethodChange = (event) => {
        const selectedMethod = event.target.value;
        setPaymentMethod(selectedMethod);
        setShowCardNumber(selectedMethod === 'card');
    };
    const decreaseQuantity = () => {
        if (quantity > 1){
            setQuantity(quantity - 1);
        }
    }
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const orderData = {
            product_name: item.name, // Название товара
            quantity: item.quantity, // Количество
            price: parseFloat(item.price.replace('₽', '')), // Цена (убираем символ '₽')
            delivery_method: deliveryMethod, // Способ доставки
            payment_method: paymentMethod, // Способ оплаты
            card_number: paymentMethod === 'card' ? cardNumber : null, // Номер карты (если оплата онлайн)
        };

        try {
            const response = await fetch('/api/create_order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при создании заказа');
            }

            const result = await response.json();
            alert(result.message); // Ответ от сервера
            setIsModalOpen(false); // Закрыть модальное окно
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при создании заказа.');
        }
    };

    return (
        <>
            <div className="cartitem">
                <img src={pencil} className="imagee" alt="Карандаш" />
                <p className="name">{item.name}</p>
                <button className="basket" onClick={() => removeFromCart(item.id)}>
                    <img src={basketImg} className='basketImg' alt="Удалить" />
                </button>
                <button className="buy" onClick={handleBuyClick}>Купить</button>
                <p className='price'>{item.price}₽</p>
                <div id='quantity-div'>
                    <button className='controlQ' onClick={decreaseQuantity}>-</button>
                    <p className='quantity'>{quantity}</p>
                    <button className='controlQ' onClick={increaseQuantity}>+</button>
                </div>
                
            </div>

            {isModalOpen && (
                <div className="modal">
                    <form className='modal-content' onSubmit={handleSubmit}>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Оформление заказа</h2>
                        <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
                            <option value="В пункт выдачи">В пункт выдачи</option>
                            <option value="Доставка на дом">Доставка на дом</option>
                        </select>
                        <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                            <option value='online'>При выдаче</option>
                            <option value='card'>Онлайн</option>
                        </select>
                        {showCardNumber && (
                            <input
                                type="text"
                                placeholder="Номер карты"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        )}
                        <button type="submit">Отправить</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default CartItem;