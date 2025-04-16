import Pencil from '../img/pencil.jpg'

function HistoryItem(){


    return(
        <>
        <div>
            <img src={Pencil} alt="Карандаш" />
            <span className='heading'>{order.product_name}</span>
            <span className='status'>{order.status}</span>
        </div>
        </>
        
    )
}
export default HistoryItem