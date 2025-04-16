import './NotFound.css'
import { useNavigate } from 'react-router-dom'

function NotFound(){
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };

    return(
        <>
        <h1 className="notFoundText">404</h1>
        <span>Страница, на которую вы попытались перейти не существует</span><br /><br />
        <button onClick={handleGoBack}>В начало</button>
        </>
        
    )
}
export default NotFound