import { Order } from '../models/Order';
import { CartItem } from '../models/CartItem';
import { products } from './products';

// Helper to get some products
const getItems = (productIdsAndQuantities) => {
    return productIdsAndQuantities.map(({ id, quantity }) => {
        const product = products.find(p => p.id === id);
        return new CartItem(product, quantity);
    });
};

export const orders = [
    new Order('ORD-2024-001', 3, 'Rahim Uddin', '01711223344', '123 Main St, Dhaka', '৳ 145.00', 'Delivered', '2023-11-20', getItems([{ id: 1, quantity: 2 }, { id: 5, quantity: 1 }]), 1, 'cod', 'Please call before delivery.'),
    new Order('ORD-2024-002', 3, 'Karim Box', '01755667788', '45 North Road, Sirajganj', '৳ 250.00', 'Processing', '2023-11-21', getItems([{ id: 10, quantity: 1 }, { id: 12, quantity: 2 }]), 2, 'bkash', ''),
    new Order('ORD-2024-003', null, 'Salma Begum', '01899887766', 'New Market Area, Ullapara', '৳ 80.00', 'Shipped', '2023-11-21', getItems([{ id: 3, quantity: 1 }]), 1, 'nagad', 'Leave at the front gate.'),
];
