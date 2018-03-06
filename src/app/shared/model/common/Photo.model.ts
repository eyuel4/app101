

export class Photo {
    public photoId : number;
    public photo_name : string;
    public url : string;

    constructor(photoId : number , photo_name : string, url : string) {
        this.photoId = photoId,
        this.photo_name = photo_name,
        this.url = url
    }
}