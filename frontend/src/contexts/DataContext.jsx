import { createContext, useContext, useState, useEffect } from 'react';
import { users as initialUsers } from '../mockdata/users';
import { products as initialProducts } from '../mockdata/products';
import { orders as initialOrders } from '../mockdata/orders';
import { branches as initialBranches } from '../mockdata/branches';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    // Helper to initialize state from localStorage or fallback to mockdata
    const initializeState = (key, initialData) => {
        const savedData = localStorage.getItem(key);
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error(`Failed to parse ${key} from local storage:`, e);
                return initialData;
            }
        }
        return initialData;
    };

    const [users, setUsers] = useState(() => initializeState('app_users', initialUsers));
    const [products, setProducts] = useState(() => initializeState('app_products', initialProducts));
    const [orders, setOrders] = useState(() => initializeState('app_orders', initialOrders));
    const [branches, setBranches] = useState(() => initializeState('app_branches', initialBranches));

    // Persist changes to localStorage whenever state updates
    useEffect(() => localStorage.setItem('app_users', JSON.stringify(users)), [users]);
    useEffect(() => localStorage.setItem('app_products', JSON.stringify(products)), [products]);
    useEffect(() => localStorage.setItem('app_orders', JSON.stringify(orders)), [orders]);
    useEffect(() => localStorage.setItem('app_branches', JSON.stringify(branches)), [branches]);

    // Data Management Methods

    // --- Users ---
    const addUser = (user) => setUsers(prev => [...prev, user]);
    const updateUser = (id, updatedUser) => setUsers(prev => prev.map(u => u.id === id ? updatedUser : u));
    const deleteUser = (id) => setUsers(prev => prev.filter(u => u.id !== id));

    // --- Products ---
    const addProduct = (product) => setProducts(prev => [...prev, product]);
    const updateProduct = (id, updatedProduct) => setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
    const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

    // --- Orders ---
    const addOrder = (order) => setOrders(prev => [...prev, order]);
    const updateOrderStatus = (id, status) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));

    // --- Branches ---
    const addBranch = (branch) => setBranches(prev => [...prev, branch]);
    const updateBranch = (id, updatedBranch) => setBranches(prev => prev.map(b => b.id === id ? updatedBranch : b));
    const deleteBranch = (id) => setBranches(prev => prev.filter(b => b.id !== id));

    const value = {
        users, addUser, updateUser, deleteUser,
        products, addProduct, updateProduct, deleteProduct,
        orders, addOrder, updateOrderStatus,
        branches, addBranch, updateBranch, deleteBranch
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
