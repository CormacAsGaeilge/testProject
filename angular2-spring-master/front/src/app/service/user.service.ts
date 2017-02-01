import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';

import { User } from '../user/user.component';
import {webServiceEndpoint} from '../commons';



import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(`${webServiceEndpoint}/user`, this.auth()).map(this.extractData).publish();
    }

    getById(id: number) {
        return this.http.get(`${webServiceEndpoint}/user` + id, this.auth()).map(this.extractData).publish();
    }

    create(user: User){
        console.log("create called");
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${webServiceEndpoint}/user`, JSON.stringify(user), { headers: headers }).publish().refCount();
    }

    update(user: User) {
        return this.http.put(`${webServiceEndpoint}/uesr/${user.id}`, user, this.auth()).publish().refCount();
    }

    delete(id: number) {
        return this.http.delete(`${webServiceEndpoint}/user/${id}`, this.auth()).publish().refCount();
    }

    private auth() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}