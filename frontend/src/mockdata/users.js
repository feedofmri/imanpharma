import { User } from '../models/User';

export const users = [
    new User(1, 'Admin User', 'admin@imanpharma.com', 'admin', 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'),
    new User(2, 'Manager User', 'manager@imanpharma.com', 'manager', 'https://api.dicebear.com/7.x/avataaars/svg?seed=manager'),
    new User(3, 'Test Buyer', 'buyer@imanpharma.com', 'buyer', 'https://api.dicebear.com/7.x/avataaars/svg?seed=buyer')
];
