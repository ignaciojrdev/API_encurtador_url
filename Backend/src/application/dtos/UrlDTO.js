export class UrlDTO {
    constructor(
        id,
        userId,
        url,
        shortUrl,
        access_counter,
        deleted,
        updated
    ) {
        this.id = id;
        this.origin_url = url;
        this.short_url = shortUrl;
        this.user_id = userId;
        this.access_counter = access_counter;
        this.deleted = deleted;
        this.updated = updated;
    }
}