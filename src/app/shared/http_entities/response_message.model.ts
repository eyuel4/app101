export class ResponseMessage {
    public success : boolean;
    public message : string;
    public error : string;
    public statusCode : number;
    public message_type : string;

    constructor(success : boolean, message : string, error : string, statusCode : number, type : string) {
        this.success = success;
        this.message = message;
        this.error = error;
        this.statusCode = statusCode;
        this.message_type = type;
    }
}