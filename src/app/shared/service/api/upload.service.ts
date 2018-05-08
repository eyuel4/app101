import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

    constructor(private http: HttpClient) {}

    pushFileToStorage(file : File): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);

        const req = new HttpRequest('POST', 'http://localhost:8082/ibexapp/oauth-resource/ibex/api/user/profile/upload', formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }
}