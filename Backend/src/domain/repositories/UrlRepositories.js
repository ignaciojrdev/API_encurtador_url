import { UrlDTO } from '../../application/dtos/UrlDTO.js';
class UrlRepository{
    constructor(database, config){
        this.database = database;
        this.config = config;
    }
    saveShortUrl = async( id, userId, url, shortUrl, access_counter, deleted, updated ) => {
        const connection = await this.database.createConnection(this.config);
        await connection.execute(`INSERT INTO URL(ID, ID_USER, URL, SHORT_URL, ACCESS_COUNTER, DELETED, UPDATED)
                                            VALUES(?, ?, ?, ?, ?, ?, ?)`, 
                                [id, userId, url, shortUrl, access_counter, deleted, updated]);
        connection.end();
    }

    getUrlByShortURLWithoutId = async(shortUrl) => {
        const connection = await this.database.createConnection(this.config);
        const [rows] = await connection.execute(`SELECT * FROM URL WHERE URL.SHORT_URL = ? AND URL.DELETED IS NULL`, [shortUrl]);
        connection.end();
        if(rows.length == 0){
            return null;
        }
        let row = rows[0];
        return new UrlDTO(row['id'], row['id_user'], row['url'], row['short_url'], row['access_counter'], row['deleted'], row['updated']); 
    }

    increments_access_counter = async(id, short_url, counter) => {
        const connection = await this.database.createConnection(this.config);
        await connection.execute(`UPDATE URL SET ACCESS_COUNTER = ? WHERE URL.ID = ? AND URL.SHORT_URL = ?`, 
                                [counter, id, short_url]);
        connection.end();
    }
        
    getshort_url_listByUserId = async(iduser) => {
        const connection = await this.database.createConnection(this.config);
        const [rows] = await connection.execute(`SELECT * FROM URL WHERE URL.ID_USER = ? AND URL.DELETED IS NULL`, [iduser]);
        connection.end();
        if(rows.length == 0){
            return null;
        }
        let rowsReturn = [];
        rows.forEach(url => {
            rowsReturn.push(new UrlDTO(url['id'], url['id_user'], url['url'], url['short_url'], url['access_counter'], url['deleted'], url['updated'])); 
        });
        return rowsReturn;
    }

    delete_short_url = async(short_url, id_user) => {
        const connection = await this.database.createConnection(this.config);
        await connection.execute(`UPDATE URL SET DELETED = SYSDATE() WHERE URL.SHORT_URL = ? AND URL.ID_USER = ?`, 
                                [short_url, id_user]);
        connection.end();
    }

    update_short_url = async(url, short_url, id_user) => {
        const connection = await this.database.createConnection(this.config);
        await connection.execute(`UPDATE URL SET URL = ? WHERE URL.SHORT_URL = ? AND URL.ID_USER = ?`, 
                                [url, short_url, id_user]);
        connection.end();
    }
}

export { 
    UrlRepository
}