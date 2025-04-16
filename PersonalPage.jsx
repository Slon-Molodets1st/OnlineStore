import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../header/UserContext';
import HistoryItem from './HistoryItem';
import './pp.css';

function PersonalPage() {
    const { userEmail } = useContext(UserContext);
    const { userId } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/get_orders.php?user_id=${userId}`);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке заказов');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    return (
        <>
            <h2 id='username'>{userEmail}</h2>
            <h3>История заказов</h3>
            <div className='history-container'>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <HistoryItem key={order.id} order={order} />
                    ))
                ) : (
                    <p>Заказов нет</p>
                )}
            </div>
        </>
    );
}

export default PersonalPage;