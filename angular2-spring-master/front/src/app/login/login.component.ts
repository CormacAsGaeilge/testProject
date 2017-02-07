import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Http, Response, Request, RequestMethod} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
	loginForm : FormGroup;
	authenticated : boolean;
	profile : Object;

 constructor(fb: FormBuilder, public http: Http, private route: ActivatedRoute,
   private router: Router, private authenticationService: AuthenticationService,
   private alertService: AlertService){
    if(localStorage.getItem('jwt')){
      this.authenticated = true;
      this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    this.loginForm = fb.group({
      'email' : [null, Validators.required],
      'password': [null, Validators.required],
    })
  }

   submitForm(value: any){
    let form = {
      'client_id' : 'YOUR-AUTH0-CLIENT-ID',
      'username' : value.email,
      'password' : value.password,
      'connection' : 'YOUR-DATABASE-CONNECTION-NAME',
      'grant_type' : 'password',
      'scope' : 'openid name email'
    }

    this.http.post('https://YOUR-AUTH0-DOMAIN.auth0.com/oauth/ro', form).subscribe(
      (res:any)=>{
        let data = res.json();
        if(data.id_token){
          localStorage.setItem('jwt', data.id_token);
          this.getUserInfo(data);
        }
      }
    )
  }

  getUserInfo(data: any){
    let form = {
      'id_token' : data.id_token
    }
    this.http.post('https://YOUR-AUTH0-DOMAIN.auth0.com/tokeninfo', form).subscribe(
      (res:any)=>{
        let data = res.json();
        this.profile = data;
        localStorage.setItem('profile', JSON.stringify(data));
        this.authenticated = true;
        this.loginForm.reset();
      }
    )
  }


    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
  
  logout(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('profile');
    this.authenticated = false;
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
