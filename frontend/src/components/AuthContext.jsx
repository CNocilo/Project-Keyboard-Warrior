import React from 'react'
import { createContext, useState } from 'react'

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const[isAuthenticated, setIsAuthenticated] = useState(false)

    const loggingIn = () => {
        setIsAuthenticated(true)
    }
    const loggingOut = () => {
        setIsAuthenticated(false)
    }
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, loggingIn, loggingOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext }