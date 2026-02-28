import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            try {
                return JSON.parse(savedCart);
            } catch (e) {
                console.error("Failed to parse cart items from local storage:", e);
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, branchId = null) => {
        setCartItems(prevItems => {
            // Match by both product id AND branchId (same product from diff branches = separate items)
            const existingItem = prevItems.find(
                item => item.product.id === product.id && item.branchId === branchId
            );
            if (existingItem) {
                return prevItems.map(item =>
                    item.product.id === product.id && item.branchId === branchId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { product, quantity, branchId }];
        });
    };

    const removeFromCart = (productId, branchId) => {
        setCartItems(prevItems => prevItems.filter(
            item => !(item.product.id === productId && item.branchId === branchId)
        ));
    };

    const updateQuantity = (productId, branchId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId, branchId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId && item.branchId === branchId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount: cartItems.reduce((total, item) => total + item.quantity, 0)
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
