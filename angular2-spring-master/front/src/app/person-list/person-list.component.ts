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
    originalPersons:  PaginationPage<Person>;
    self: Table<Person>;
    originalP : Person = new Person();
    newPerson: Person = new Person();
    editable : boolean;
    isChanged : boolean;
    isAdd : boolean;
    chartVisible : boolean;
    updated : number;
    chartData : Array<any>;
    chartLabels : Array<any>;
    timer: any;
    
    constructor(private personService: PersonService, private router: Router) {
        
    }

    ngOnInit() {
        let observable: Rx.Observable<PaginationPage<any>> = this.fetchPage(0, 20, null);
        showLoading();
        this.originalPersons = this.personPage;
        observable.subscribe(doNothing, hideLoading, hideLoading);
        this.self = this;
        this.editable = false;
        this.isChanged = false;
        this.isAdd = false;
        this.chartVisible = false;
        this.updated = 0;
        this.chartData = [
            {data: [20,20,20,20,20], label: 'Age'},
          ];
        this.chartLabels = [];
    }

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort): Rx.Observable<PaginationPage<Person>> {
        let observable: Rx.Observable<PaginationPage<Person>> = this.personService.findPersons(pageNumber, pageSize, sort);
        observable.subscribe(personPage => this.personPage = personPage);
        this.updateChart();
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

    checkIfChange(id)
    {
        if(id.classList.contains('ng-dirty'))
            this.isChanged=true;
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
        
        //var count = 0;
        //var idCount=this.personPage.content[count].id;
        for(let p of this.personPage.content)
        {

            //this.originalP = this.originalPersons.content[count];

            //if(p.firstname != this.originalP.firstname || p.lastname != this.originalP.lastname || p.age != this.originalP.age)
                //this.updated++;
            //console.log(idCount + "," + p.id);
            //p.id=idCount;
            this.update(p);
            //console.log(idCount + "," + p.id);
            //count++;
            //idCount=this.personPage.content[count].id;

        }
        //Display change log
        this.isChanged=false;
        this.editable=false;
        this.updateChart();
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

    updateChart()
    {
        setTimeout(() => {  
            if(!this.chartVisible)
                this.chartVisible = true;

            let ages: number[] = [];
            let i = 0;
            for(let p of this.personPage.content)
            {
                ages[i]=p.age;
                 this.chartLabels[i]=p.firstname;
                i++;

                console.log(p.location);
            }

            this.chartData = [
                {data: ages, label: 'Age'},
            ];
        }, 500);
    }

    add(){

        this.personService.addPerson(this.newPerson).subscribe(
            data => {
                this.newPerson = new Person();
            },
            error => console.log(error));
        this.isAdd=false;

        this.router.navigate(['']);
        this.updateChart();
    }

    delete(person) {

        let observable: Rx.Observable<Response> = this.personService.deletePerson(person.id);
        showLoading();
        observable.switchMap(() => {
            return this.fetchPage(0, 20, null);
        }).subscribe(doNothing, hideLoading, hideLoading);

        this.updateChart();
    }

    
}
