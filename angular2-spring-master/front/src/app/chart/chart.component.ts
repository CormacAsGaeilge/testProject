import { Component, OnInit } from '@angular/core';
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-chart',
  directives: [CHART_DIRECTIVES],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

	private datasets = [
	    {
	      label: "# of Votes",
	      data: [12, 19, 18, 5, 2, 3]
	    },
	    {
	      label: "# of Fake Votes",
	      data: [1, 3, 2, 2, 0, 1]
	    },
	    {
	      label: "# of Other Votes",
	      data: [20, 5, 12, 7, 15, 17]
	    },
  	];

  	private labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

	private options = {
		scales: {
			yAxes: [{
				ticks: {
	  				beginAtZero: true,
			 	}
			}]
		}
	};
  constructor() { }

  ngOnInit() {
  }

}
