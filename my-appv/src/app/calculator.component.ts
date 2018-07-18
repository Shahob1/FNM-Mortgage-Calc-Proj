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
        var loanAmountMain = 0;

        if (this.mortgageCalc.principal == 0 && this.mortgageCalc.downpayment == 0) {
            loanAmountMain = this.mortgageCalc.loanAmount;
        }
        else {
            if (loanAmount.value != this.mortgageCalc.principal - (this.mortgageCalc.principal * .01 * this.mortgageCalc.downpayment)) {
                loanAmountMain = this.mortgageCalc.loanAmount;
                homePrice.value = "";
                downPayment.value = "";
            }
            else {
                loanAmountMain = this.mortgageCalc.principal - (this.mortgageCalc.principal * .01 * (this.mortgageCalc.downpayment));
                var loanAmount5LessDown = this.mortgageCalc.principal - (this.mortgageCalc.principal * .01 * (this.mortgageCalc.downpayment - 5));
                var loanAmount5MoreDown = this.mortgageCalc.principal - (this.mortgageCalc.principal * .01 * (this.mortgageCalc.downpayment + 5));
            }
        }

        //if (this.mortgageCalc.loanAmount == 0) { // hasn't been typed in
        //    loanAmountMain = this.mortgageCalc.principal - (this.mortgageCalc.principal * .01 * (this.mortgageCalc.downpayment));
        //    var loanAmount5LessDown = this.mortgageCalc.principal - (this.mortgageCalc.principal * .01 * (this.mortgageCalc.downpayment - 5));
        //    var loanAmount5MoreDown = this.mortgageCalc.principal - (this.mortgageCalc.principal * .01 * (this.mortgageCalc.downpayment + 5));
        //}
        //else {
        //    //if (this.mortgageCalc.loanAmount != loanAmountHTML) {
        //        //grey out top 2 boxes and maybe erase values
        //    //}
        //    loanAmountMain = this.mortgageCalc.loanAmount;
        //}

        console.log("years:" + this.mortgageCalc.years);
        console.log("loanAmountMain:" + loanAmountMain);
        console.log("calculateMortgage:" + this.mortgageCalc.getMonthlyPayment(loanAmountMain));
        console.log("calculateInterest:" + this.mortgageCalc.calculateInterest(loanAmountMain));
        console.log("calculateTotalCost:" + this.mortgageCalc.calculateTotal(loanAmountMain));

        console.log("loanAmount5LessDown:" + loanAmount5LessDown);
        console.log("calculateMortgage:" + this.mortgageCalc.getMonthlyPayment(loanAmount5LessDown));
        console.log("calculateInterest:" + this.mortgageCalc.calculateInterest(loanAmount5LessDown));
        console.log("calculateTotalCost:" + this.mortgageCalc.calculateTotal(loanAmount5LessDown));

        console.log("loanAmount5MoreDown:" + loanAmount5MoreDown);
        console.log("calculateMortgage:" + this.mortgageCalc.getMonthlyPayment(loanAmount5MoreDown));
        console.log("calculateInterest:" + this.mortgageCalc.calculateInterest(loanAmount5MoreDown));
        console.log("calculateTotalCost:" + this.mortgageCalc.calculateTotal(loanAmount5MoreDown));
        return JSON.stringify(this.mortgageCalc);
    }

    calculateAmortization()
    {
        //var home = new Calculator(this.mortgageCalc.principal, this.mortgageCalc.downPayment, this.mortgageCalc.interest, this.mortgageCalc.years);
        console.log("number of payments" + this.mortgageCalc.getNumberOfPayments());
        
        var i: number;
        var currBalance = this.mortgageCalc.loanAmount;
        var currBalanceLowerDown = this.mortgageCalc.loanAmount;
        var currBalanceHigherDown = this.mortgageCalc.loanAmount;
        var monthlyPayment = this.mortgageCalc.getMonthlyPayment(loanAmount);
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
            interest : currMonthInterest.toLocaleString('en-us', {maximumFractionDigits: 2}),
            balance: currBalance.toLocaleString('en-us', { maximumFractionDigits: 2 })
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
