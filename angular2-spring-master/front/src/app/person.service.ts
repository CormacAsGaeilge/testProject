import {Injectable} from '@angular/core';
import {Person} from './domain';
//import {PersonObj} from './model/PersonObj';
import {PaginationPage, PaginationPropertySort} from './pagination';
import {webServiceEndpoint} from './commons';
import {Http, Response, URLSearchParams, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';



import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';

@Injectable()
export class PersonService {

    constructor(private http: Http) {

    }

    findPersons(page: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
        let params = new URLSearchParams();
        params.set('size', `${pageSize}`);
        params.set('page', `${page}`);
        if (sort != null) {
            params.set('sort', `${sort.property},${sort.direction}`);
        }

        let options = new RequestOptions({
            search: params
        });
        return this.http.get(`${webServiceEndpoint}/person`, options).map(this.extractData).publish().refCount();
    }

    getPerson(id: number): Rx.Observable<Person> {
        return this.http.get(`${webServiceEndpoint}/person/${id}`).map(this.extractData).publish().refCount();
    }

    deletePerson(id: number): Rx.Observable<Response> {
        return this.http.delete(`${webServiceEndpoint}/person/${id}`).publish().refCount();
    }
    updatePerson(person: Person): Rx.Observable<Response>
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put(`${webServiceEndpoint}/person`, JSON.stringify(person),{headers: headers}).publish().refCount();
    }

    addPerson(person: Person): Rx.Observable<Response>
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${webServiceEndpoint}/person`,JSON.stringify(person),{headers: headers}).publish().refCount();
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    importCSV(file : File)
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${webServiceEndpoint}/file`,JSON.stringify(file),{headers: headers}).publish().refCount();
    }
}
