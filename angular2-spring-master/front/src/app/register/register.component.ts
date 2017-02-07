import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  model: any = {};
  loading = false;
	complexForm : FormGroup;

  constructor(fb: FormBuilder, private router:Router,
    private userService: UserService, private alertService: AlertService) { 
  	this.complexForm = fb.group({
      'firstName' : '',
      'lastName': '',
      'email': '',
      'password':'',
      'confirmpassword' : '',
      'phone' : '',
      'gender' : ['Female'],
      'auth' : false,
      'normal' : false,
      'manager' : false
    })
  }

    submitForm(value: any){
    console.log('Reactive Form Data: ')
    console.log(value);
  }

      register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
