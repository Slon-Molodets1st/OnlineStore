import Header from './header/Header';
import Footer from './footer/Footer';
import Item from './CatalogueComponents/Item';
import './Catalogue.css';
import PersonalPage from './personalPage/PersonalPage';
import Cart from './cart/Cart';
import { useState, useEffect } from 'react';

function Catalogue() {
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]); 

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, quantity: Number(quantity) } : item
        ));
    };
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch('/api/get_products.php');
        const goods = await response.json();
        
        setFilteredProducts(goods);
    };
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState('catalogue');
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);

    const handleSearch = () => {
        const filtered = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className='hdr'>
                <Header active={page} onChange={(current) => setPage(current)} />
            </div>
            {page === 'catalogue' && (
                <div>
                    <div className='searchBar'>
                        <input
                            type='text'
                            placeholder='Поиск...'
                            className='search'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="search-button" onClick={handleSearch}>Найти</button>
                    </div>
                    
                    <div className='products'>
                        {currentProducts.map((product) => (
                            <div className='item' key={product.id}>
                                <Item
                                    key={product.id}
                                    product={product}
                                    onAddToCart={() => addToCart(product)}
                                />
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="pagination">
                            {pageNumbers.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => setCurrentPage(number)}
                                    className={currentPage === number ? 'active' : ''}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {page === 'cart' && (
                <Cart
                    onChange={(current) => setPage(current)}
                    cartItems={cart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                />
            )}
            {page === 'pp' && (
                <PersonalPage onChange={(current) => setPage(current)} />
            )}
            <div className='ftr'>
                <Footer />
            </div>
        </>
    );
}

export default Catalogue;