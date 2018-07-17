/* tslint:disable:class-name component-class-suffix */
import { Component } from '@angular/core';

import { Calculator } from './calculator';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html'

})

export class CalcComponent {
    mortgageCalc = new Calculator();
    


    constructor(){}

    submitted = false;

    onSubmit() { this.submitted = true; }

    diagnostic() {
    //onsole.log("calculateMortgage:" + this.mortgageCalc.loanAmount);
    	console.log("calculateMortgage:" + this.mortgageCalc.calculateMortgage());
    	console.log("calculateInterest:" + this.mortgageCalc.calculateInterest());
    	console.log("calculateTotalCost:" + this.mortgageCalc.calculateTotal());
        return JSON.stringify(this.mortgageCalc);
    }

    sMcalculator(){
    	return this.mortgageCalc.loanAmount;
    }

}
