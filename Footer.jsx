import './Footer.css'
import FooterImg from '../img/CIL.png'

function Footer(){

    return(
        <footer>
            <img src={FooterImg}></img>
            <p className='text'>
                <a href="aywassap">Корзина</a><br/><br />
                itsnotenough@mail.ru <br/>
                8 879 630 65 38
            </p>

        </footer>
    )
}
export default Footer