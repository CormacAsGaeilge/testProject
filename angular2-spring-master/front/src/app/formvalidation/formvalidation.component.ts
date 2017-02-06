import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formvalidation',
  templateUrl: './formvalidation.component.html',
  styleUrls: ['./formvalidation.component.css']
})
export class FormvalidationComponent implements OnInit {

	complexForm : FormGroup;

  constructor(fb: FormBuilder) {
    var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    var phoneRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

  	this.complexForm = fb.group({
  		'firstName' : [null, Validators.required],
  		'lastName' : [null,  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'email' : [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      'password' : [null, Validators.compose([Validators.required, Validators.pattern(phoneRegex)])],
      'confirmpassword' : [null, Validators.required],
      'phone' : [null, Validators.required],
  		'gender' : [null, Validators.required],
  		'auth' : [false],
  		'normal' : [false],
  		'manager' : [false]
  	})
  	 console.log(this.complexForm);
  	  this.complexForm.valueChanges.subscribe( (form: any) => {
      console.log('form changed to:', form);
    }
    );
   }

   submintForm(value: any){
   	console.log(value);
   }

  ngOnInit() {
  }

}
