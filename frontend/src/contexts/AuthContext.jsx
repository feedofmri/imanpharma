import { createContext, useContext, useState, useEffect } from 'react';
import { useData } from './DataContext';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const { users } = useData();
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (e) {
                console.error("Failed to parse user from local storage:", e);
                return null;
            }
        }
        return null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Mock login function
    const login = async (email, password) => {
        // In a real app, this would be an API call
        // Mocking validation against users.js, accepting any password for the mock for now
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const foundUser = users.find(u => u.email === email);
                if (foundUser && password) {
                    setUser(foundUser);
                    resolve(foundUser);
                } else {
                    reject(new Error("Invalid email or password. Hint: Try admin@imanpharma.com or buyer@imanpharma.com"));
                }
            }, 500);
        });
    };

    const register = async (name, email, password, phone) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password && name) {
                    const buyerUser = { id: Date.now(), name, email, phone: phone || '', role: 'buyer' };
                    setUser(buyerUser);
                    resolve(buyerUser);
                } else {
                    reject(new Error("Please fill in all fields"));
                }
            }, 500);
        });
    }

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isManager: user?.role === 'manager',
        isBuyer: user?.role === 'buyer'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
