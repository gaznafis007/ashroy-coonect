'use client';
import React, { createContext, useState } from 'react';
import {SessionProvider} from 'next-auth/react'

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const value = {
        user,
        loading,
        setUser,
        setLoading
    }
    return (
        <AuthContext.Provider value={value}>
            <SessionProvider>
            {children}
            </SessionProvider>
        </AuthContext.Provider>
    );
};

export default AuthProvider;