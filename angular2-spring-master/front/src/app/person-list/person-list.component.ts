import {Component, OnInit, ViewChild} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import * as Rx from 'rxjs/Rx';

import 'rxjs/add/operator/switchMap';

import {PaginationPage, PaginationPropertySort} from '../pagination';
import {Table} from '../table';
import {showLoading, hideLoading, doNothing} from '../commons'
import {PersonService} from '../person.service';
import {Person} from '../domain';
import {ReportSheetComponent} from '../report-sheet/report-sheet.component';
@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, Table<Person> {

    @ViewChild(ReportSheetComponent) childcmp:ReportSheetComponent;

    updateCharts(){
        this.childcmp.updateCharts();
    }
    
    personPage : PaginationPage<Person>;
    self : Table<Person>;
    newPerson: Person = new Person();
    editable : boolean;
    isChanged : boolean;
    isAdd : boolean;
    pageListSize : number;
    updated : number;

    constructor(private personService: PersonService, private router: Router) {
        
    }

    ngOnInit() {
        this.pageListSize = 10;
        
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, this.pageListSize, null);
        showLoading();
        observable.subscribe(doNothing, hideLoading, hideLoading);
        this.self = this;
        this.editable = false;
        this.isChanged = false;
        this.isAdd = false;
        this.updated = 0;
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
        let observable: Rx.Observable<PaginationPage<Person>> = this.personService.findPersons(pageNumber, pageSize, sort);
        observable.subscribe(personPage => this.personPage = personPage);
        return observable;
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

    checkIfChange(id, person)
    {
        if(id.classList.contains('ng-dirty'))
        {
            this.isChanged=true;
            person.changed=true;
        }
    }

    toggleEditable(bool : boolean)
    {
        console.log(bool);
        if(bool)
            this.editable = true; 
        else
            this.editable = false;   
    }

    checkForUpdate()
    {
        this.updated=0;
        for(let p of this.personPage.content)
        {
            if(p.changed == true)
            {
                this.updated++;
                p.changed = false;
            }
            this.update(p);
        }
        this.isChanged=false;
        this.editable=false;
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
        for(let p of this.personPage.content)
        {
            this.delete(p);
        }
    }

    add(){
        this.personService.addPerson(this.newPerson).subscribe(
            data => {
                this.newPerson = new Person();
            },
            error => console.log(error));
        this.isAdd=false;
        this.fetchPage(0, this.pageListSize, null);
        this.updateCharts();
    }

    delete(person) {

        let observable: Rx.Observable<Response> = this.personService.deletePerson(person.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, this.pageListSize, null);
        }).subscribe(doNothing, hideLoading, hideLoading);
    }

    
}
