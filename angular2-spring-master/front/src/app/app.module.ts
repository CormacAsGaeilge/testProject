import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {ChartsModule } from 'ng2-charts';
import {ChartModule } from 'angular2-highcharts';
import {DragulaModule }from 'ng2-dragula';
import {AppComponent} from './app.component';
import {PersonComponent} from './person/person.component';
import {PersonListComponent} from './person-list/person-list.component';
import {TableElementsCountComponent} from './table-elements-count/table-elements-count.component';
import {TablePaginationComponent} from './table-pagination/table-pagination.component';
import {TableSortComponent} from './table-sort/table-sort.component';
import {PersonService} from './person.service';
import {UserService} from './service/user.service';
import {PersonEditComponent} from './person-edit/person-edit.component';
import {PersonAddComponent} from './person-add/person-add.component';
import {AlertService} from './service/alert.service';
import {AuthenticationService} from './service/authentication.service';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {UserRegisterComponent} from './user-register/user-register.component';

import { ChartComponent } from './chart/chart.component';
import { ChartService } from './service/chart.service';


import { HighchartComponent } from './highchart/highchart.component';
import { GooglechartComponent } from './googlechart/googlechart.component';
import { GooglePieChartComponent } from './google-pie-chart/google-pie-chart.component';
import { ReportSheetComponent } from './report-sheet/report-sheet.component';
import { ModalComponent } from './modal/modal.component';
import { HcPieComponent } from './highchart/hc-pie/hc-pie.component';
import { HcBarComponent } from './highchart/hc-bar/hc-bar.component';
import { FormvalidationComponent } from './formvalidation/formvalidation.component';

const appRoutes: Routes = [
    {path: '', component: PersonListComponent},
    {path: 'person/:id', component: PersonComponent},
    {path: 'person_edit/:id', component: PersonEditComponent},
    {path: 'person_add', component: PersonAddComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        PersonComponent,
        PersonListComponent,
        TableElementsCountComponent,
        TablePaginationComponent,
        TableSortComponent,
        PersonEditComponent,
        PersonAddComponent,
        RegisterComponent,
        LoginComponent,
        UserRegisterComponent,
        ChartComponent,
        HighchartComponent,
        GooglechartComponent,
        GooglePieChartComponent,
        ReportSheetComponent,
        ModalComponent,
        HcPieComponent,
        HcBarComponent,
        RegisterComponent,
        LoginComponent,
        FormvalidationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        ChartsModule,
        ChartModule,
        DragulaModule,
        ReactiveFormsModule
    ],
   
    providers: [
        PersonService, 
        UserService, 
        AuthenticationService , 
        AlertService,  
        ChartService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
