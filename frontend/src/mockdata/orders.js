import { Order } from '../models/Order';
import { CartItem } from '../models/CartItem';
import { products } from './products';

// Helper to get cart items from product IDs
const getItems = (productIdsAndQuantities) => {
    return productIdsAndQuantities.map(({ id, quantity }) => {
        const product = products.find(p => p.id === id);
        return product ? new CartItem(product, quantity) : null;
    }).filter(Boolean);
};

// Helpers for generating realistic data
const paymentMethods = ['cod', 'bkash', 'nagad'];
const statuses = ['Processing', 'Shipped', 'Delivered'];

export const orders = [
    // ============ DECEMBER 2025 — ~30 orders ============

    // Branch 1 — Ullapara Main
    new Order('ORD-2025-1201', 100, 'Rahim Uddin', '01811223344', '123 Bazar Road, Ullapara', '৳ 108.00', 'Delivered', '2025-12-01', getItems([{ id: 1, quantity: 3 }]), 1, 'cod', ''),
    new Order('ORD-2025-1202', 101, 'Fatema Akter', '01911334455', '45 College Road, Ullapara', '৳ 296.00', 'Delivered', '2025-12-03', getItems([{ id: 8, quantity: 2 }, { id: 13, quantity: 2 }]), 1, 'bkash', 'Please deliver before 5 PM.'),
    new Order('ORD-2025-1203', 103, 'Salma Begum', '01899887766', 'New Market, Ullapara', '৳ 510.00', 'Delivered', '2025-12-06', getItems([{ id: 3, quantity: 10 }]), 1, 'nagad', ''),
    new Order('ORD-2025-1204', 104, 'Arif Hossain', '01755667788', 'Madrasa Road, Ullapara', '৳ 192.00', 'Delivered', '2025-12-10', getItems([{ id: 5, quantity: 6 }]), 1, 'cod', 'Leave at the gate.'),
    new Order('ORD-2025-1205', 100, 'Rahim Uddin', '01811223344', '123 Bazar Road, Ullapara', '৳ 142.00', 'Delivered', '2025-12-15', getItems([{ id: 61, quantity: 2 }]), 1, 'bkash', ''),
    new Order('ORD-2025-1206', 102, 'Karim Box', '01633445566', 'Station Road, Ullapara', '৳ 460.00', 'Delivered', '2025-12-20', getItems([{ id: 28, quantity: 5 }, { id: 30, quantity: 5 }]), 1, 'cod', ''),

    // Branch 2 — Sirajganj City
    new Order('ORD-2025-1207', 101, 'Fatema Akter', '01911334455', 'S.S. Road, Sirajganj', '৳ 660.00', 'Delivered', '2025-12-02', getItems([{ id: 14, quantity: 3 }, { id: 50, quantity: 3 }, { id: 2, quantity: 3 }]), 2, 'nagad', ''),
    new Order('ORD-2025-1208', 102, 'Karim Box', '01633445566', '12 Hospital Road, Sirajganj', '৳ 186.00', 'Delivered', '2025-12-05', getItems([{ id: 9, quantity: 2 }, { id: 25, quantity: 2 }]), 2, 'bkash', ''),
    new Order('ORD-2025-1209', 104, 'Arif Hossain', '01755667788', 'Court Area, Sirajganj', '৳ 355.00', 'Delivered', '2025-12-09', getItems([{ id: 37, quantity: 5 }, { id: 22, quantity: 1 }]), 2, 'cod', ''),
    new Order('ORD-2025-1210', 100, 'Rahim Uddin', '01811223344', '88 Boro Bazar, Sirajganj', '৳ 480.00', 'Delivered', '2025-12-14', getItems([{ id: 38, quantity: 8 }]), 2, 'nagad', 'Urgent delivery needed.'),
    new Order('ORD-2025-1211', 103, 'Salma Begum', '01899887766', 'Shahid Nagar, Sirajganj', '৳ 210.00', 'Delivered', '2025-12-19', getItems([{ id: 70, quantity: 2 }, { id: 71, quantity: 1 }]), 2, 'bkash', ''),
    new Order('ORD-2025-1212', 101, 'Fatema Akter', '01911334455', 'S.S. Road, Sirajganj', '৳ 165.00', 'Delivered', '2025-12-25', getItems([{ id: 17, quantity: 3 }, { id: 19, quantity: 1 }]), 2, 'cod', 'Christmas order.'),

    // Branch 3 — Shahjadpur
    new Order('ORD-2025-1213', 103, 'Salma Begum', '01899887766', 'Bus Stand Area, Shahjadpur', '৳ 330.00', 'Delivered', '2025-12-01', getItems([{ id: 32, quantity: 3 }, { id: 33, quantity: 3 }]), 3, 'bkash', ''),
    new Order('ORD-2025-1214', 100, 'Rahim Uddin', '01811223344', 'Bazarghata, Shahjadpur', '৳ 192.00', 'Delivered', '2025-12-07', getItems([{ id: 5, quantity: 6 }]), 3, 'cod', ''),
    new Order('ORD-2025-1215', 104, 'Arif Hossain', '01755667788', 'College Road, Shahjadpur', '৳ 540.00', 'Delivered', '2025-12-12', getItems([{ id: 15, quantity: 10 }]), 3, 'nagad', ''),
    new Order('ORD-2025-1216', 102, 'Karim Box', '01633445566', 'Govt. Hospital Road, Shahjadpur', '৳ 288.00', 'Delivered', '2025-12-18', getItems([{ id: 72, quantity: 3 }, { id: 63, quantity: 1 }]), 3, 'bkash', ''),
    new Order('ORD-2025-1217', 101, 'Fatema Akter', '01911334455', 'Station Bazar, Shahjadpur', '৳ 400.00', 'Delivered', '2025-12-24', getItems([{ id: 40, quantity: 5 }, { id: 20, quantity: 5 }]), 3, 'cod', ''),
    new Order('ORD-2025-1218', 103, 'Salma Begum', '01899887766', 'Bus Stand Area, Shahjadpur', '৳ 156.00', 'Delivered', '2025-12-28', getItems([{ id: 6, quantity: 4 }, { id: 10, quantity: 2 }]), 3, 'nagad', ''),

    // Branch 4 — Bogura
    new Order('ORD-2025-1219', 104, 'Arif Hossain', '01755667788', 'Satmatha, Bogura', '৳ 552.00', 'Delivered', '2025-12-02', getItems([{ id: 8, quantity: 4 }, { id: 41, quantity: 4 }]), 4, 'cod', ''),
    new Order('ORD-2025-1220', 100, 'Rahim Uddin', '01811223344', 'Banani, Bogura', '৳ 320.00', 'Delivered', '2025-12-08', getItems([{ id: 46, quantity: 4 }, { id: 43, quantity: 4 }]), 4, 'bkash', ''),
    new Order('ORD-2025-1221', 102, 'Karim Box', '01633445566', 'Thana Road, Bogura', '৳ 450.00', 'Delivered', '2025-12-13', getItems([{ id: 55, quantity: 5 }, { id: 56, quantity: 5 }]), 4, 'nagad', 'Call before delivery.'),
    new Order('ORD-2025-1222', 101, 'Fatema Akter', '01911334455', 'Railway Gate, Bogura', '৳ 230.00', 'Delivered', '2025-12-21', getItems([{ id: 10, quantity: 10 }]), 4, 'cod', ''),
    new Order('ORD-2025-1223', 103, 'Salma Begum', '01899887766', 'Chowmatha, Bogura', '৳ 688.00', 'Delivered', '2025-12-27', getItems([{ id: 50, quantity: 8 }, { id: 49, quantity: 4 }]), 4, 'bkash', ''),

    // Branch 5 — Pabna
    new Order('ORD-2025-1224', 102, 'Karim Box', '01633445566', 'Abdul Hamid Road, Pabna', '৳ 396.00', 'Delivered', '2025-12-04', getItems([{ id: 2, quantity: 8 }, { id: 1, quantity: 4 }]), 5, 'nagad', ''),
    new Order('ORD-2025-1225', 104, 'Arif Hossain', '01755667788', 'Court Area, Pabna', '৳ 585.00', 'Delivered', '2025-12-10', getItems([{ id: 41, quantity: 9 }]), 5, 'cod', ''),
    new Order('ORD-2025-1226', 100, 'Rahim Uddin', '01811223344', 'Edward College Road, Pabna', '৳ 270.00', 'Delivered', '2025-12-17', getItems([{ id: 25, quantity: 10 }]), 5, 'bkash', ''),
    new Order('ORD-2025-1227', 103, 'Salma Begum', '01899887766', 'Radhanagar, Pabna', '৳ 360.00', 'Delivered', '2025-12-22', getItems([{ id: 20, quantity: 10 }]), 5, 'cod', ''),
    new Order('ORD-2025-1228', 101, 'Fatema Akter', '01911334455', 'Shalgaria, Pabna', '৳ 155.00', 'Delivered', '2025-12-29', getItems([{ id: 13, quantity: 1 }, { id: 37, quantity: 1 }, { id: 22, quantity: 1 }]), 5, 'nagad', ''),

    // ============ JANUARY 2026 — ~30 orders ============

    // Branch 1 — Ullapara Main
    new Order('ORD-2026-0101', 100, 'Rahim Uddin', '01811223344', '123 Bazar Road, Ullapara', '৳ 216.00', 'Delivered', '2026-01-02', getItems([{ id: 1, quantity: 6 }]), 1, 'bkash', ''),
    new Order('ORD-2026-0102', 103, 'Salma Begum', '01899887766', 'New Market, Ullapara', '৳ 320.00', 'Delivered', '2026-01-06', getItems([{ id: 5, quantity: 10 }]), 1, 'cod', ''),
    new Order('ORD-2026-0103', 101, 'Fatema Akter', '01911334455', '45 College Road, Ullapara', '৳ 710.00', 'Delivered', '2026-01-10', getItems([{ id: 61, quantity: 10 }]), 1, 'nagad', 'For the whole family.'),
    new Order('ORD-2026-0104', 104, 'Arif Hossain', '01755667788', 'Madrasa Road, Ullapara', '৳ 184.00', 'Delivered', '2026-01-15', getItems([{ id: 28, quantity: 4 }, { id: 6, quantity: 2 }]), 1, 'cod', ''),
    new Order('ORD-2026-0105', 102, 'Karim Box', '01633445566', 'Station Road, Ullapara', '৳ 500.00', 'Delivered', '2026-01-20', getItems([{ id: 59, quantity: 10 }]), 1, 'bkash', ''),
    new Order('ORD-2026-0106', 100, 'Rahim Uddin', '01811223344', '123 Bazar Road, Ullapara', '৳ 552.00', 'Delivered', '2026-01-26', getItems([{ id: 8, quantity: 4 }, { id: 13, quantity: 4 }, { id: 3, quantity: 2 }]), 1, 'nagad', ''),

    // Branch 2 — Sirajganj City
    new Order('ORD-2026-0107', 102, 'Karim Box', '01633445566', '12 Hospital Road, Sirajganj', '৳ 400.00', 'Delivered', '2026-01-03', getItems([{ id: 20, quantity: 5 }, { id: 19, quantity: 5 }]), 2, 'bkash', ''),
    new Order('ORD-2026-0108', 104, 'Arif Hossain', '01755667788', 'Court Area, Sirajganj', '৳ 290.00', 'Delivered', '2026-01-07', getItems([{ id: 9, quantity: 10 }]), 2, 'cod', ''),
    new Order('ORD-2026-0109', 100, 'Rahim Uddin', '01811223344', '88 Boro Bazar, Sirajganj', '৳ 590.00', 'Delivered', '2026-01-12', getItems([{ id: 29, quantity: 5 }, { id: 30, quantity: 5 }]), 2, 'nagad', ''),
    new Order('ORD-2026-0110', 103, 'Salma Begum', '01899887766', 'Shahid Nagar, Sirajganj', '৳ 178.00', 'Delivered', '2026-01-17', getItems([{ id: 70, quantity: 2 }, { id: 14, quantity: 2 }]), 2, 'cod', ''),
    new Order('ORD-2026-0111', 101, 'Fatema Akter', '01911334455', 'S.S. Road, Sirajganj', '৳ 860.00', 'Delivered', '2026-01-22', getItems([{ id: 68, quantity: 10 }]), 2, 'bkash', ''),
    new Order('ORD-2026-0112', 104, 'Arif Hossain', '01755667788', 'Court Area, Sirajganj', '৳ 126.00', 'Delivered', '2026-01-28', getItems([{ id: 42, quantity: 2 }, { id: 12, quantity: 1 }]), 2, 'nagad', ''),

    // Branch 3 — Shahjadpur
    new Order('ORD-2026-0113', 100, 'Rahim Uddin', '01811223344', 'Bazarghata, Shahjadpur', '৳ 336.00', 'Delivered', '2026-01-04', getItems([{ id: 8, quantity: 6 }]), 3, 'cod', ''),
    new Order('ORD-2026-0114', 103, 'Salma Begum', '01899887766', 'Bus Stand Area, Shahjadpur', '৳ 480.00', 'Delivered', '2026-01-09', getItems([{ id: 33, quantity: 10 }]), 3, 'bkash', ''),
    new Order('ORD-2026-0115', 102, 'Karim Box', '01633445566', 'Govt. Hospital Road, Shahjadpur', '৳ 183.00', 'Delivered', '2026-01-14', getItems([{ id: 37, quantity: 3 }]), 3, 'cod', ''),
    new Order('ORD-2026-0116', 101, 'Fatema Akter', '01911334455', 'Station Bazar, Shahjadpur', '৳ 690.00', 'Delivered', '2026-01-18', getItems([{ id: 50, quantity: 10 }]), 3, 'nagad', ''),
    new Order('ORD-2026-0117', 104, 'Arif Hossain', '01755667788', 'College Road, Shahjadpur', '৳ 560.00', 'Delivered', '2026-01-23', getItems([{ id: 8, quantity: 10 }]), 3, 'bkash', ''),
    new Order('ORD-2026-0118', 100, 'Rahim Uddin', '01811223344', 'Bazarghata, Shahjadpur', '৳ 245.00', 'Delivered', '2026-01-29', getItems([{ id: 26, quantity: 7 }]), 3, 'cod', ''),

    // Branch 4 — Bogura
    new Order('ORD-2026-0119', 101, 'Fatema Akter', '01911334455', 'Railway Gate, Bogura', '৳ 390.00', 'Delivered', '2026-01-02', getItems([{ id: 41, quantity: 6 }]), 4, 'nagad', ''),
    new Order('ORD-2026-0120', 104, 'Arif Hossain', '01755667788', 'Satmatha, Bogura', '৳ 520.00', 'Delivered', '2026-01-08', getItems([{ id: 46, quantity: 4 }, { id: 48, quantity: 4 }]), 4, 'cod', ''),
    new Order('ORD-2026-0121', 100, 'Rahim Uddin', '01811223344', 'Banani, Bogura', '৳ 280.00', 'Delivered', '2026-01-13', getItems([{ id: 43, quantity: 10 }]), 4, 'bkash', ''),
    new Order('ORD-2026-0122', 102, 'Karim Box', '01633445566', 'Thana Road, Bogura', '৳ 640.00', 'Delivered', '2026-01-19', getItems([{ id: 27, quantity: 10 }]), 4, 'nagad', ''),
    new Order('ORD-2026-0123', 103, 'Salma Begum', '01899887766', 'Chowmatha, Bogura', '৳ 168.00', 'Delivered', '2026-01-25', getItems([{ id: 1, quantity: 2 }, { id: 2, quantity: 2 }, { id: 3, quantity: 1 }]), 4, 'cod', ''),
    new Order('ORD-2026-0124', 101, 'Fatema Akter', '01911334455', 'Railway Gate, Bogura', '৳ 910.00', 'Delivered', '2026-01-30', getItems([{ id: 66, quantity: 5 }, { id: 65, quantity: 5 }]), 4, 'bkash', ''),

    // Branch 5 — Pabna
    new Order('ORD-2026-0125', 103, 'Salma Begum', '01899887766', 'Radhanagar, Pabna', '৳ 220.00', 'Delivered', '2026-01-05', getItems([{ id: 2, quantity: 10 }]), 5, 'cod', ''),
    new Order('ORD-2026-0126', 100, 'Rahim Uddin', '01811223344', 'Edward College Road, Pabna', '৳ 490.00', 'Delivered', '2026-01-11', getItems([{ id: 55, quantity: 10 }]), 5, 'bkash', ''),
    new Order('ORD-2026-0127', 104, 'Arif Hossain', '01755667788', 'Court Area, Pabna', '৳ 360.00', 'Delivered', '2026-01-16', getItems([{ id: 20, quantity: 10 }]), 5, 'nagad', ''),
    new Order('ORD-2026-0128', 102, 'Karim Box', '01633445566', 'Abdul Hamid Road, Pabna', '৳ 830.00', 'Delivered', '2026-01-21', getItems([{ id: 64, quantity: 10 }]), 5, 'cod', 'Pharmacy bulk order.'),
    new Order('ORD-2026-0129', 101, 'Fatema Akter', '01911334455', 'Shalgaria, Pabna', '৳ 290.00', 'Delivered', '2026-01-27', getItems([{ id: 9, quantity: 10 }]), 5, 'bkash', ''),

    // ============ FEBRUARY 2026 — ~30 orders (mix of statuses) ============

    // Branch 1 — Ullapara Main
    new Order('ORD-2026-0201', 100, 'Rahim Uddin', '01811223344', '123 Bazar Road, Ullapara', '৳ 180.00', 'Delivered', '2026-02-01', getItems([{ id: 1, quantity: 5 }]), 1, 'cod', ''),
    new Order('ORD-2026-0202', 101, 'Fatema Akter', '01911334455', '45 College Road, Ullapara', '৳ 660.00', 'Delivered', '2026-02-05', getItems([{ id: 2, quantity: 10 }, { id: 19, quantity: 10 }]), 1, 'bkash', 'Urgent.'),
    new Order('ORD-2026-0203', 104, 'Arif Hossain', '01755667788', 'Madrasa Road, Ullapara', '৳ 290.00', 'Shipped', '2026-02-10', getItems([{ id: 9, quantity: 10 }]), 1, 'nagad', ''),
    new Order('ORD-2026-0204', 102, 'Karim Box', '01633445566', 'Station Road, Ullapara', '৳ 355.00', 'Shipped', '2026-02-15', getItems([{ id: 26, quantity: 5 }, { id: 30, quantity: 3 }]), 1, 'cod', ''),
    new Order('ORD-2026-0205', 103, 'Salma Begum', '01899887766', 'New Market, Ullapara', '৳ 444.00', 'Processing', '2026-02-20', getItems([{ id: 17, quantity: 8 }, { id: 13, quantity: 2 }]), 1, 'bkash', ''),
    new Order('ORD-2026-0206', 100, 'Rahim Uddin', '01811223344', '123 Bazar Road, Ullapara', '৳ 710.00', 'Processing', '2026-02-25', getItems([{ id: 61, quantity: 10 }]), 1, 'nagad', 'Need receipt.'),

    // Branch 2 — Sirajganj City
    new Order('ORD-2026-0207', 104, 'Arif Hossain', '01755667788', 'Court Area, Sirajganj', '৳ 320.00', 'Delivered', '2026-02-02', getItems([{ id: 5, quantity: 10 }]), 2, 'cod', ''),
    new Order('ORD-2026-0208', 100, 'Rahim Uddin', '01811223344', '88 Boro Bazar, Sirajganj', '৳ 550.00', 'Delivered', '2026-02-06', getItems([{ id: 13, quantity: 10 }]), 2, 'bkash', ''),
    new Order('ORD-2026-0209', 103, 'Salma Begum', '01899887766', 'Shahid Nagar, Sirajganj', '৳ 700.00', 'Shipped', '2026-02-11', getItems([{ id: 70, quantity: 6 }, { id: 71, quantity: 4 }]), 2, 'nagad', ''),
    new Order('ORD-2026-0210', 101, 'Fatema Akter', '01911334455', 'S.S. Road, Sirajganj', '৳ 300.00', 'Shipped', '2026-02-16', getItems([{ id: 17, quantity: 10 }]), 2, 'cod', ''),
    new Order('ORD-2026-0211', 102, 'Karim Box', '01633445566', '12 Hospital Road, Sirajganj', '৳ 580.00', 'Processing', '2026-02-21', getItems([{ id: 29, quantity: 5 }, { id: 30, quantity: 5 }]), 2, 'bkash', ''),
    new Order('ORD-2026-0212', 104, 'Arif Hossain', '01755667788', 'Court Area, Sirajganj', '৳ 246.00', 'Processing', '2026-02-26', getItems([{ id: 37, quantity: 2 }, { id: 38, quantity: 2 }]), 2, 'nagad', ''),

    // Branch 3 — Shahjadpur
    new Order('ORD-2026-0213', 102, 'Karim Box', '01633445566', 'Govt. Hospital Road, Shahjadpur', '৳ 480.00', 'Delivered', '2026-02-03', getItems([{ id: 33, quantity: 10 }]), 3, 'bkash', ''),
    new Order('ORD-2026-0214', 100, 'Rahim Uddin', '01811223344', 'Bazarghata, Shahjadpur', '৳ 560.00', 'Delivered', '2026-02-07', getItems([{ id: 8, quantity: 10 }]), 3, 'cod', ''),
    new Order('ORD-2026-0215', 104, 'Arif Hossain', '01755667788', 'College Road, Shahjadpur', '৳ 690.00', 'Shipped', '2026-02-12', getItems([{ id: 50, quantity: 10 }]), 3, 'nagad', ''),
    new Order('ORD-2026-0216', 101, 'Fatema Akter', '01911334455', 'Station Bazar, Shahjadpur', '৳ 240.00', 'Shipped', '2026-02-17', getItems([{ id: 40, quantity: 4 }, { id: 22, quantity: 2 }]), 3, 'cod', ''),
    new Order('ORD-2026-0217', 103, 'Salma Begum', '01899887766', 'Bus Stand Area, Shahjadpur', '৳ 350.00', 'Processing', '2026-02-22', getItems([{ id: 26, quantity: 10 }]), 3, 'bkash', 'Call when ready.'),
    new Order('ORD-2026-0218', 100, 'Rahim Uddin', '01811223344', 'Bazarghata, Shahjadpur', '৳ 510.00', 'Processing', '2026-02-27', getItems([{ id: 3, quantity: 10 }]), 3, 'nagad', ''),

    // Branch 4 — Bogura
    new Order('ORD-2026-0219', 103, 'Salma Begum', '01899887766', 'Chowmatha, Bogura', '৳ 390.00', 'Delivered', '2026-02-01', getItems([{ id: 41, quantity: 6 }]), 4, 'nagad', ''),
    new Order('ORD-2026-0220', 101, 'Fatema Akter', '01911334455', 'Railway Gate, Bogura', '৳ 480.00', 'Delivered', '2026-02-06', getItems([{ id: 46, quantity: 10 }]), 4, 'cod', ''),
    new Order('ORD-2026-0221', 100, 'Rahim Uddin', '01811223344', 'Banani, Bogura', '৳ 640.00', 'Shipped', '2026-02-11', getItems([{ id: 27, quantity: 10 }]), 4, 'bkash', ''),
    new Order('ORD-2026-0222', 102, 'Karim Box', '01633445566', 'Thana Road, Bogura', '৳ 510.00', 'Shipped', '2026-02-16', getItems([{ id: 48, quantity: 10 }]), 4, 'nagad', ''),
    new Order('ORD-2026-0223', 104, 'Arif Hossain', '01755667788', 'Satmatha, Bogura', '৳ 280.00', 'Processing', '2026-02-22', getItems([{ id: 43, quantity: 10 }]), 4, 'cod', ''),
    new Order('ORD-2026-0224', 103, 'Salma Begum', '01899887766', 'Chowmatha, Bogura', '৳ 960.00', 'Processing', '2026-02-27', getItems([{ id: 66, quantity: 10 }]), 4, 'bkash', 'Bulk for clinic.'),

    // Branch 5 — Pabna
    new Order('ORD-2026-0225', 104, 'Arif Hossain', '01755667788', 'Court Area, Pabna', '৳ 360.00', 'Delivered', '2026-02-02', getItems([{ id: 20, quantity: 10 }]), 5, 'nagad', ''),
    new Order('ORD-2026-0226', 102, 'Karim Box', '01633445566', 'Abdul Hamid Road, Pabna', '৳ 490.00', 'Delivered', '2026-02-08', getItems([{ id: 55, quantity: 10 }]), 5, 'cod', ''),
    new Order('ORD-2026-0227', 101, 'Fatema Akter', '01911334455', 'Shalgaria, Pabna', '৳ 220.00', 'Shipped', '2026-02-13', getItems([{ id: 2, quantity: 10 }]), 5, 'bkash', ''),
    new Order('ORD-2026-0228', 100, 'Rahim Uddin', '01811223344', 'Edward College Road, Pabna', '৳ 650.00', 'Shipped', '2026-02-18', getItems([{ id: 41, quantity: 10 }]), 5, 'nagad', ''),
    new Order('ORD-2026-0229', 103, 'Salma Begum', '01899887766', 'Radhanagar, Pabna', '৳ 590.00', 'Processing', '2026-02-23', getItems([{ id: 59, quantity: 10 }, { id: 6, quantity: 2 }]), 5, 'cod', ''),
    new Order('ORD-2026-0230', 104, 'Arif Hossain', '01755667788', 'Court Area, Pabna', '৳ 830.00', 'Processing', '2026-02-28', getItems([{ id: 64, quantity: 10 }]), 5, 'bkash', 'Monthly restock.'),
];
