import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm : FormGroup;

  constructor(fb: FormBuilder) { 
  	this.registerForm = fb.group({
      'firstName' : '',
      'lastName': '',
      'email': '',
      'password':'',
      'confirmpassword' : '',
      'phone' : '',
      'gender' : ['Female'],
      'anth' : false,
      'normal' : false,
      'manager' : false
    })
  }

    submitForm(value: any){
    console.log('Reactive Form Data: ')
    console.log(value);
  }

  ngOnInit() {
  }

}
