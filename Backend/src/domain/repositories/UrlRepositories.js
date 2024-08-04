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
        return new UrlDTO(row['id'], row['id_user'], row['url'], row['SHORT_URL'], row['access_counter'], row['deleted'], row['updated']); 
    }
}

export { 
    UrlRepository
}