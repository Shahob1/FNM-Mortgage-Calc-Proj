/* tslint:disable:class-name component-class-suffix */
import { Component } from '@angular/core';

import { Calculator } from './calculator';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html'

})

export class CalcComponent {
    mortgageCalc = new Calculator()


    submitted = false;

    onSubmit() { this.submitted = true; }

    diagnostic() {
    	console.log("calculateMortgage:" + this.mortgageCalc.calculateMortgage());
    	console.log("calculateInterest:" + this.mortgageCalc.calculateInterest());
    	console.log("calculateTotalCost:" + this.mortgageCalc.calculateTotal());
        return JSON.stringify(this.mortgageCalc);
    }

}
