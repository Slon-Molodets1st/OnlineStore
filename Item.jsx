import './Item.css'
import goods from '../Catalogue'
import pencil from '../img/pencil.jpg'

function Item({product, onAddToCart}){
    
    return(
        <>
            
                <img src={product.image}></img>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p id='price'><b>{product.price}₽</b></p>
                <button onClick={onAddToCart}>В корзину</button>
            
        </>
    )
}
export default Item