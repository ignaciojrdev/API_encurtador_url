export class User{
    constructor(id, name, password, token, updated, deleted){
        this.id = id;
        this.name = name;
        this.password = password;
        this.token = token;
        this.updated = updated;
        this.deleted = deleted;
    }
}