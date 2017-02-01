import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';
import * as Rx from 'rxjs/Rx';

import {PersonService} from '../person.service';
import {Person} from '../domain';
import {showLoading, hideLoading, doNothing} from '../commons'

@Component({
    selector: 'app-person',
    templateUrl: './person-edit.component.html',
    styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

    person: Person;
    constructor(private router: Router, private route: ActivatedRoute, private personService: PersonService) {

    }

    ngOnInit() {
        this.route.params.subscribe(params=> {
            this.personService.getPerson(Number(params['id']))
            .subscribe(
                person => this.person = person);
        });

    }

    update(){

        this.personService.updatePerson(this.person)
        .subscribe(
          data => {
            this.person = new Person();
          },
          error => console.log(error)
        );
        this.router.navigate(['']);
    }


    back() {
        history.back();
    }
}
