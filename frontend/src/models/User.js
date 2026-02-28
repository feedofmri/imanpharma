export class User {
    constructor(id, name, email, role, avatarUrl, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role; // 'admin', 'manager', 'buyer'
        this.avatarUrl = avatarUrl;
        this.phone = phone || '';
    }
}
