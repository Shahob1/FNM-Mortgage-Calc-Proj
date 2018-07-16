import { Component, Input } from '@angular/core';

import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mortgage Calculator';
  @Input('interestRate') interestRate: number;
  @Input('loanAmount') loan: any;
  @Input('loanTerm') years: any;
  @Input('interestRate') interest: any;
  @Input('output') output: any;
  
  // mortgageCalc = new Calculator(400000, 20000, 4, 30);

  test = new Calculator(this.loan, 20000, this.interest, this.years);

calculateTest(){
  // console.log("INPUT:");
  // console.log("Loan: $400,000");
  // console.log("Downpayment: $20,000");
  // console.log("Interest Rate: 4.00%");
  // console.log("Years: 30");
  // console.log("==============================");
  // console.log("OUTPUT:");
  // console.log("Monthly Mortgage= $" + this.mortgageCalc.calculateMortgage());
  // console.log("Total Interest=  $" + this.mortgageCalc.calculateInterest());
  // console.log("Total Cost=  $" + this.mortgageCalc.calculateTotal());

  console.log("INPUT:");
  console.log("Loan: $400,000");
  console.log("Downpayment: $20,000");
  console.log("Interest Rate: 4.00%");
  console.log("Years: 30");
  console.log("==============================");
  console.log("OUTPUT:");
  console.log("Monthly Mortgage= $" + this.test.calculateMortgage());
  console.log("Total Interest=  $" + this.test.calculateInterest());
  console.log("Total Cost=  $" + this.test.calculateTotal());

}

}
