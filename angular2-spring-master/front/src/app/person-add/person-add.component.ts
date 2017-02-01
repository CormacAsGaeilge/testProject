import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';

import {PersonService} from '../person.service';
import {Person} from '../domain';
//import {Person} from '../domain';
import {showLoading, hideLoading, doNothing} from '../commons'

@Component({
    selector: 'app-person',
    templateUrl: './person-add.component.html',
    styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

    person: Person = new Person();

    constructor(private router: Router, private route: ActivatedRoute, private personService: PersonService) {
        
    }

    ngOnInit() {

    }

    add(){

        this.personService.addPerson(this.person).subscribe(
            data => {
                this.person = new Person();
            },
            error => console.log(error));
        

        this.router.navigate(['']);
    }

    back() {
        history.back();
    }
}