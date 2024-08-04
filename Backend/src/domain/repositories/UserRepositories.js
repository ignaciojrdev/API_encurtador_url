import { UserDTO } from '../../application/dtos/UserDTO.js';

class UserRepository{
    constructor(database, config){
        this.database = database;
        this.config = config;
    }
    
    getUserByToken = async(token) => {
        const connection = await this.database.createConnection(this.config);
        const [rows] = await connection.execute(`SELECT * FROM USER WHERE USER.BEARER_TOKEN = ?`, [token]);
        connection.end();
        if(rows.length == 0){
            return null;
        }
        let row = rows[0];
        return new UserDTO(row['id'], row['email'], row['password'], row['bearer_token'], row['updated'], row['deleted']); 
    }

    getUserById = async(id) => {
        const connection = await this.database.createConnection(this.config);
        const [rows] = await connection.execute(`SELECT * FROM USER WHERE USER.ID = ?`, [id]);
        connection.end();
        if(rows.length == 0){
            return null;
        }
        let row = rows[0];
        return new UserDTO(row['id'], row['email'], row['password'], row['bearer_token'], row['updated'], row['deleted']); 
    }

    getUserByEmail = async(email) => {
        const connection = await this.database.createConnection(this.config);
        const [rows] = await connection.execute(`SELECT * FROM USER WHERE USER.EMAIL = ?`, [email]);
        connection.end();
        if(rows.length == 0){
            return null;
        }
        let row = rows[0];
        return new UserDTO(row['id'], row['email'], row['password'], row['bearer_token'], row['updated'], row['deleted']); 
    }

    save_user = async(id, email, password, token, updated, deleted) => {
        const connection = await this.database.createConnection(this.config);
        await connection.execute(`INSERT INTO USER(ID, EMAIL, PASSWORD, BEARER_TOKEN, UPDATED, DELETED) 
                                            values(?, ?, ?, ?, ?, ?)`, 
                                [id, email, password, token, updated, deleted]);
        connection.end();
    }

    update_user = async(id, email, password, token, updated) => {
        const connection = await this.database.createConnection(this.config);
        await connection.execute(`UPDATE USER SET EMAIL = ?, PASSWORD = ?, BEARER_TOKEN = ?, UPDATED = ? WHERE USER.ID = ?`, 
                                [email, password, token, updated, id]);
        connection.end();
    }

}

export { 
    UserRepository
}