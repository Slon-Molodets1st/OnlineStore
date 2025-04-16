import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './header/UserContext';

function Authorization({ onChange }) {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const handleGoBack = () => {
        navigate(-1);
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            const response = await fetch('/api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Ошибка сервера');
            }

            const result = await response.json();

            if (result.message === "Login successful.") {
                login(result.user_id, result.role, result.email);
                navigate('/'); 
            } else {
                alert(result.message); 
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert('Произошла ошибка. Проверьте консоль для подробностей.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="button" id='back2' value={'←'} onClick={handleGoBack} />
            <h1>Вход</h1>
            <label htmlFor='email'>Логин</label>
            <input type='text' name="email" placeholder='Введите логин' />
            <label htmlFor='password'>Пароль</label>
            <input type='password' name="password" placeholder='Введите пароль' />
            <input type='submit' value='Войти' />
            <p>Нет аккаунта? Можете <button onClick={() => onChange('registration')} className='otherForm'>зарегистрироваться</button></p>
        </form>
    );
}

export default Authorization;