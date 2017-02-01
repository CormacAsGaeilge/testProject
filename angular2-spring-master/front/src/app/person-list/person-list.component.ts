import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import * as Rx from 'rxjs/Rx';

import 'rxjs/add/operator/switchMap';

import {PaginationPage, PaginationPropertySort} from '../pagination';
import {Table} from '../table';
import {showLoading, hideLoading, doNothing} from '../commons'
import {PersonService} from '../person.service';
import {Person} from '../domain';

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})

// @Component({
//   selector: 'sample-list',
//   templateUrl: './sample-list.component.html'
// })
// export class WowExampleComponent {
//   public clicked:any = {
//     'one': false,
//     'two': false,
//     'three': false,
//     'four': false,
//     'five': false,
//     'six': false,
//     'seven': false
//   };

//   public onclick(key:any):void {
//     this.clicked[key] = true;
//     setTimeout(() => {
//       this.clicked[key] = false;
//     }, 2000);
//   }
// }


export class PersonListComponent implements OnInit, Table<Person> {

    personPage: PaginationPage<Person>;
    self: Table<Person>;
    newPerson: Person = new Person();
    editable : boolean;


    constructor(private personService: PersonService, private router: Router) {
        
    }

    ngOnInit() {
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 10, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
        this.self = this;
        this.editable = false;
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
        let observable: Rx.Observable<PaginationPage<Person>> = this.personService.findPersons(pageNumber, pageSize, sort);
        observable.subscribe(personPage => this.personPage = personPage);
        return observable;
    }

    toggleEditable(bool : boolean)
    {
        console.log(bool);
        if(bool)
            this.editable = true; 
        else
            this.editable = false;   
    }
    goToDetails(person) {
        this.router.navigate(['person', person.id]);
    }
     goToEdit(person)
    {
        this.router.navigate(['person_edit', person.id]);
    }

    goToAdd()
    {
        this.router.navigate(['person_add']);
    }

    update(person){

        this.personService.updatePerson(person)
        .subscribe(
          data => {
            person = new Person();
          },
          error => console.log(error)
        );
        this.router.navigate(['']);
    }

    deleteAll()
    {

    }
    
    add(){

        this.personService.addPerson(this.newPerson).subscribe(
            data => {
                this.newPerson = new Person();
            },
            error => console.log(error));
        

        this.router.navigate(['']);
    }

    delete(person) {

        let observable: Rx.Observable<Response> = this.personService.deletePerson(person.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, 10, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }

    
}
