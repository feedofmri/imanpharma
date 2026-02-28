import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
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
        // Mocking roles based on email
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@imanpharma.com') {
                    const adminUser = { id: 1, name: 'Admin', email, role: 'admin' };
                    setUser(adminUser);
                    resolve(adminUser);
                } else if (email === 'manager@imanpharma.com') {
                    const managerUser = { id: 2, name: 'Manager', email, role: 'manager' };
                    setUser(managerUser);
                    resolve(managerUser);
                } else if (email && password) {
                    const buyerUser = { id: 3, name: email.split('@')[0], email, role: 'buyer' };
                    setUser(buyerUser);
                    resolve(buyerUser);
                } else {
                    reject(new Error("Invalid credentials"));
                }
            }, 500);
        });
    };

    const register = async (name, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password && name) {
                    const buyerUser = { id: Date.now(), name, email, role: 'buyer' };
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
