export const users = [
    // Admin
    { id: 1, name: 'Admin User', email: 'admin@imanpharma.com', role: 'admin', phone: '01700000001', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' },

    // Managers — one per branch
    { id: 10, name: 'Rafiqul Islam', email: 'rafiq@imanpharma.com', role: 'manager', phone: '01700000010', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rafiq' },
    { id: 11, name: 'Shahidul Haque', email: 'shahid@imanpharma.com', role: 'manager', phone: '01700000011', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=shahid' },
    { id: 12, name: 'Aminul Karim', email: 'amin@imanpharma.com', role: 'manager', phone: '01700000012', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amin' },
    { id: 13, name: 'Habibur Rahman', email: 'habib@imanpharma.com', role: 'manager', phone: '01700000013', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=habib' },
    { id: 14, name: 'Jamal Uddin', email: 'jamal@imanpharma.com', role: 'manager', phone: '01700000014', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jamal' },

    // Buyers — with phone and saved addresses
    {
        id: 100, name: 'Rahim Uddin', email: 'rahim@gmail.com', role: 'buyer', phone: '01811223344',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahim',
        addresses: [
            { label: 'Home', address: '123 Bazar Road', area: 'Ullapara', city: 'Sirajganj', isDefault: true },
            { label: 'Office', address: '88 Boro Bazar', area: 'Shahid Nagar', city: 'Sirajganj', isDefault: false }
        ]
    },
    {
        id: 101, name: 'Fatema Akter', email: 'fatema@gmail.com', role: 'buyer', phone: '01911334455',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatema',
        addresses: [
            { label: 'Home', address: '45 College Road', area: 'Ullapara', city: 'Sirajganj', isDefault: true }
        ]
    },
    {
        id: 102, name: 'Karim Box', email: 'karim@gmail.com', role: 'buyer', phone: '01633445566',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karim',
        addresses: [
            { label: 'Home', address: 'Station Road', area: 'Ullapara', city: 'Sirajganj', isDefault: true },
            { label: 'Office', address: 'Abdul Hamid Road', area: 'Pabna Sadar', city: 'Pabna', isDefault: false }
        ]
    },
    {
        id: 103, name: 'Salma Begum', email: 'salma@gmail.com', role: 'buyer', phone: '01899887766',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=salma',
        addresses: [
            { label: 'Home', address: 'New Market', area: 'Ullapara', city: 'Sirajganj', isDefault: true }
        ]
    },
    {
        id: 104, name: 'Arif Hossain', email: 'arif@gmail.com', role: 'buyer', phone: '01755667788',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arif',
        addresses: [
            { label: 'Home', address: 'Madrasa Road', area: 'Ullapara', city: 'Sirajganj', isDefault: true },
            { label: 'Office', address: 'Court Area', area: 'Pabna Sadar', city: 'Pabna', isDefault: false },
            { label: 'Other', address: 'Satmatha', area: 'Bogura Sadar', city: 'Bogura', isDefault: false }
        ]
    },
];
