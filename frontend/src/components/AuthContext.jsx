import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/checkloggedin', {credentials: 'include'});
                const data = await response.json();
                if (data.authenticated) {
                    setIsAuthenticated(true);
                    setUsername(data.username);
                } else {
                    setIsAuthenticated(false);
                    setUsername('');
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
                setUsername('');
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, username }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };