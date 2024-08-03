export class UserDTO {
    constructor(
        id,
        name,
        password,
        token,
        createdAt
    ) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.token = token;
        this.createdAt = createdAt;
    }
}