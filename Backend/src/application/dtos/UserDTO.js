class UserDTO {
    constructor(
        id,
        email,
        password,
        bearer_token,
        updated,
        deleted
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.bearer_token = bearer_token;
        this.updated = updated;
        this.deleted = deleted;
    }
}

export { 
    UserDTO
}