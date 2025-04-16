import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './header/UserContext';
import { useContext } from 'react';
import './AdminPanel.css';

function AdminPanel() {
    const navigate = useNavigate();
    const { userRole } = useContext(UserContext);

    if (userRole !== 'admin') {
        navigate('/'); 
        return null;
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch('/api/get_products.php');
        const data = await response.json();
        setProducts(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/add_product.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log(result);
        fetchProducts();
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
        });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/update_product.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, id: editingProduct.id }),
        });
        const result = await response.json();
        console.log(result);
        setEditingProduct(null);
        fetchProducts();
    };

    const handleDeleteProduct = async (id) => {
        const response = await fetch('/api/delete_product.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        const result = await response.json();
        console.log(result);
        fetchProducts();
    };

    return (
        <div className="admin-panel">
            <button onClick={handleGoBack} id='previous'>←</button>
            <h1>Админ-панель</h1>
            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
                <input
                    type="text"
                    name="name"
                    placeholder="Название товара"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Описание товара"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Цена товара"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Ссылка на изображение"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">
                    {editingProduct ? 'Обновить товар' : 'Добавить товар'}
                </button>
            </form>

            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Цена: {product.price}₽</p>
                        <img src={product.image} alt={product.name} />
                        <button onClick={() => handleEditProduct(product)}>Редактировать</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPanel;