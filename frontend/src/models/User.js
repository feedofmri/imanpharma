export class User {
    constructor(id, name, email, role, avatarUrl) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role; // 'admin', 'manager', 'buyer'
        this.avatarUrl = avatarUrl;
    }
}
