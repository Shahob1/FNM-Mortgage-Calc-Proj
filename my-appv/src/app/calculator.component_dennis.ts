/* tslint:disable:class-name component-class-suffix */
import { Component } from '@angular/core';

import { Calculator } from './calculator';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html'

})

export class CalcComponent {
    mortgageCalc = new Calculator();

    submitted = false;

    onSubmit() { this.submitted = true; }

    diagnostic() {
    //onsole.log("calculateMortgage:" + this.mortgageCalc.loanAmount);
    	console.log("calculateMortgage:" + this.mortgageCalc.calculateMortgage());
    	console.log("calculateInterest:" + this.mortgageCalc.calculateInterest());
    	console.log("calculateTotalCost:" + this.mortgageCalc.calculateTotal());
        return JSON.stringify(this.mortgageCalc);
    }

    sMcalculator()
    {
    	// return this.mortgageCalc.loanAmount;
    }

    calculateAmortization()
    {
        //var home = new Calculator(this.mortgageCalc.principal, this.mortgageCalc.downPayment, this.mortgageCalc.interest, this.mortgageCalc.years);
        console.log("number of paymets" + this.mortgageCalc.numberOfPayments);

        var amortizationTable: any[] = new Array(this.mortgageCalc.numberOfPayments);
        var i: number;

        var currBalance = this.mortgageCalc.principal;

        amortizationTable[0]= 
        {
            month : 0,
            payment : "",
            principal : "",
            interest : "",
            balance : currBalance,
        }

        for(i = 1; i <= this.mortgageCalc.numberOfPayments; i++)
        {
        var currMonthInterest = currBalance*this.mortgageCalc.monthlyRate;
        var currMonthPrincipal = this.mortgageCalc.monthlyPayment - currMonthInterest;
        currBalance = currBalance - this.mortgageCalc.monthlyPayment;
        amortizationTable[i]= 
        {
            month : i,
            payment : this.mortgageCalc.monthlyPayment,
            principal : currMonthPrincipal,
            interest : currMonthInterest,
            balance : currBalance,
        }

  }
    console.log("Month # " + (amortizationTable));

}
}
