import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {

  constructor() { }

  dataCount(arr) {
    var a = [], b = [], prev;
    
    arr.sort();
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i] !== prev ) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = arr[i];
        }
        return [a, b];
    }
}
