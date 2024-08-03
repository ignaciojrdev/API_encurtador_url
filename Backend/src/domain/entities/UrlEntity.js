export class Url{
    constructor(id, user_id, origin_url, short_url, access_counter, isDeleted){
        this.id = id;
        this.user_id = user_id;
        this.origin_url = origin_url;
        this.short_url = short_url;
        this.access_counter = access_counter;
        this.isDeleted = isDeleted;
    }
}