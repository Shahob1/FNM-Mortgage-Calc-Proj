import { Component, OnInit } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { CalcComponent } from '../calculator.component'
import { Calculator } from '../calculator'

@Component({
  selector: 'app-create-csv',
  templateUrl: './create-csv.component.html',
  styleUrls: ['./create-csv.component.css']
})
export class CreateCsvComponent implements OnInit {
	//mortgageCalc;
  private calc:CalcComponent
	//calc = new CalcComponent();


  constructor() { }

  createCsv(){
  	//this.mortgageCalc = this.calc.Mcalculator();
    
    var data = new Array(360);
    
    

  
  data = [
  {
    Principal: 200000,
    DownPayment: 0,
    LoanAmount: "loan",
    Interest: 6.75  ,
    LoanTerm: 30
  },
	]; 

  data[1] = {
    Principal: 4000,
    DownPayment: 0,
    LoanAmount: "loan",
    Interest: 6.75  ,
    LoanTerm: 30
    }

  console.log(data);

	new Angular5Csv(data, 'My Report');

  }

  ngOnInit() {
  }

}
