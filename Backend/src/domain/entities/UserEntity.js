export class User{
    constructor(id, name, password, token, created_at){
        this.id = id;
        this.name = name;
        this.password = password;
        this.token = token;
        this.created_at = created_at;
    }
}