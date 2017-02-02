import {Component, OnInit, Input } from '@angular/core';
import {GooglechartComponent} from '../googlechart/googlechart.component';

@Component({
  selector: 'app-google-pie-chart',
  templateUrl: './google-pie-chart.component.html',
  styleUrls: ['./google-pie-chart.component.css']
})
export class GooglePieChartComponent implements OnInit {
	@Input('data') pieData:Array<any> = [];
	@Input('labels') pieLabels:Array<string> = [];
  	@Input('title') title:string = "title";
  public pie_ChartData = [
    ];
  public pie_ChartOptions  = {
    title: 'Location',
    width: 900,
    height: 500
  };

  constructor() {
  }

  ngOnInit() {
  	let _pieData = this.pieData[0].data;

  	for(let i=0; i < _pieData.length+1; i++)
  	{
  		if(i==0)
  			this.pie_ChartData[i]=[this.title, this.title];
		else
  			this.pie_ChartData[i]=[this.pieLabels[i-1],_pieData[i-1]];
  	}
  }
  
}
