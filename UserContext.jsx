import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null); // Добавляем поле для роли
    const [userEmail, setUserEmail] = useState(null);

    const login = (id, role, email) => {
        setIsAuthenticated(true);
        setUserId(id);
        setUserRole(role); // Сохраняем роль пользователя
        setUserEmail(email);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserId(null);
        setUserRole(null); // Сбрасываем роль при выходе
        setUserEmail(null);
    };

    return (
        <UserContext.Provider value={{ isAuthenticated, userId, userRole, userEmail, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};