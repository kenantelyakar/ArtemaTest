export class ApiResponse {
    status : number;
    message : string;
    data : Object | undefined;
    constructor() {
        this.status = 200;
        this.message = "Success";
        this.data = "";
    }
}