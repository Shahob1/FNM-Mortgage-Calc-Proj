/* tslint:disable:class-name component-class-suffix */
import { Component } from '@angular/core';

import { Calculator } from './calculator';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html'

})

export class CalcComponent {
    mortgageCalc = new Calculator();
    amortizationTable = new Array(this.mortgageCalc.numberOfPayments);

    


    constructor(){}

    submitted = false;

    onSubmit() { this.submitted = true; }

    diagnostic() {
    console.log("calculateMortgage:" + this.mortgageCalc.years);
    	console.log("calculateMortgage:" + this.mortgageCalc.getMonthlyPayment());
    	console.log("calculateInterest:" + this.mortgageCalc.calculateInterest());
    	console.log("calculateTotalCost:" + this.mortgageCalc.calculateTotal());
        return JSON.stringify(this.mortgageCalc);
    }

    sMcalculator(){
    	return this.mortgageCalc.loanAmount;
    }

    calculateAmortization()
    {
        //var home = new Calculator(this.mortgageCalc.principal, this.mortgageCalc.downPayment, this.mortgageCalc.interest, this.mortgageCalc.years);
        console.log("number of payments" + this.mortgageCalc.getNumberOfPayments());

        
        var i: number;
        var currBalance = this.mortgageCalc.loanAmount;
        var monthlyPayment = this.mortgageCalc.getMonthlyPayment();
        var numberOfPayments = this.mortgageCalc.getNumberOfPayments();
        var monthlyRate = this.mortgageCalc.getMonthlyRate();

        this.amortizationTable[0]= 
        {
            month : 0,
            payment : "",
            principal : "",
            interest : "",
            balance : currBalance,
        }

        for(i = 1; i <= numberOfPayments; i++)
        {
        var currMonthInterest = currBalance*monthlyRate;
        var currMonthPrincipal = monthlyPayment - currMonthInterest;
        currBalance = currBalance - currMonthPrincipal;
        
        this.amortizationTable[i]= 
        {
            month : i,
            payment : monthlyPayment.toLocaleString('en-us', {maximumFractionDigits: 2}),
            principal : currMonthPrincipal.toLocaleString('en-us', {maximumFractionDigits: 2}),
            interest : currMonthInterest.toLocaleString('en-us', {maximumFractionDigits: 2});,
            balance : currBalance.toLocaleString('en-us', {maximumFractionDigits: 2});,
        }

  }
    console.log(this.amortizationTable);
    return this.amortizationTable;
}

downloadCSV(){

	var table = this.calculateAmortization()

	var options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: false,
    useBom: true,
    noDownload: false,
    headers: ["Month", "Payment", "Principal", "Interest", "Balance"]
  }; 

	new Angular5Csv(table, 'My Report', options);
}

}
