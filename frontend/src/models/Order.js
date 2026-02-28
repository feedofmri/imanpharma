export class Order {
    constructor(id, customerId, customerName, phone, address, total, status, date, items, branchId, paymentMethod, notes) {
        this.id = id;
        this.customerId = customerId;
        this.customerName = customerName;
        this.phone = phone;
        this.address = address;
        this.total = total;
        this.status = status; // e.g., 'Processing', 'Shipped', 'Delivered'
        this.date = date; // string or Date
        this.items = items; // Array of CartItem
        this.branchId = branchId;
        this.paymentMethod = paymentMethod;
        this.notes = notes;
    }
}
