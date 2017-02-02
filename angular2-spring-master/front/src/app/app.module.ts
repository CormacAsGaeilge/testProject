import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular2-highcharts';
import { DragulaModule }from 'ng2-dragula';
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

import {DraggableDirectiveComponent} from './draggable/draggable-directive.component';
import {DraggableProviderService} from './service/draggable-provider.service';


import { ChartComponent } from './chart/chart.component';
import { ChartService } from './service/chart.service';


import { HighchartComponent } from './highchart/highchart.component';
import { GooglechartComponent } from './googlechart/googlechart.component';
import { GooglePieChartComponent } from './google-pie-chart/google-pie-chart.component';
import { ReportSheetComponent } from './report-sheet/report-sheet.component';
import { ModalComponent } from './modal/modal.component';
//import {SampleListComponent} from './sample/sample-list.component';

const appRoutes: Routes = [
    {path: '', component: PersonListComponent},
    //{path: '', component: SampleListComponent},
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
        DraggableDirectiveComponent,
        ChartComponent,
        HighchartComponent,
        GooglechartComponent,
        GooglePieChartComponent,
        ReportSheetComponent,
        ModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        ChartsModule,
        ChartModule,
        DragulaModule
    ],
   
    providers: [PersonService, UserService, AuthenticationService , AlertService, DraggableProviderService, ChartService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
