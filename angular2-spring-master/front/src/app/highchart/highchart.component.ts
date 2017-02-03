import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'angular2-highcharts'; 

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.css']
})
export class HighchartComponent implements OnInit {

options: Object;
    from: any;
    to: any;
    serieName:any;
    point: any;



  constructor() {
        this.options = {
            title : { text : 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2],
            }]
        };
    }
    
    
    onChartSelection (e) {
	  	this.from = e.originalEvent.xAxis[0].min.toFixed(2);
	  	this.to = e.originalEvent.xAxis[0].max.toFixed(2);
	}

	onSeriesMouseOver (e) {
	  this.serieName = e.context.name;
	}

	onPointSelect (e) {
	  this.point = e.context.name;
	}
  ngOnInit() {
  }

}
