import { Component } from '@angular/core';


export class Calculator {

    public principal: number = 0;
    public downpayment: number = 0;
    public interest: number;
    public years: number;
    public loanAmount: number = 0;

  // calculated values
  public monthlyRate: number;
  public numberOfPayments: number;
  public monthlyPayment: number;
  public totalInterest: number;

  constructor() {
  }

  calculateMortgage()
  {
      
        return this.getMonthlyPayment().toLocaleString('en-us', {minimumFractionDigits: 2});

  }


  calculateInterest(loanAmt:any)
  {

    this.totalInterest = (this.getMonthlyPayment(loanAmt) * this.getNumberOfPayments()) - loanAmt;

       //return totalInterest.toLocaleString('en-us', {minimumFractionDigits: 2});
    return this.totalInterest;
  
  }

  calculateTotal(loanAmt:any)
  {

    var totalCost = this.getMonthlyPayment(loanAmt) * this.getNumberOfPayments();

       return totalCost.toLocaleString('en-us', {minimumFractionDigits: 2});

  }

  // getters
  getLoanAmount()
  {
    return this.loanAmount;
  }

  getDownpayment()
  {
    return this.downpayment;
  }

  getInterest()
  {
    return this.interest;
  }
  
  getYears()
  {
    return this.years;
  }

	getMonthlyRate()
  {
   return this.monthlyRate = (this.interest / 100) / 12;
  }

    getMonthlyPayment(loanAmt:any)
  {
  		this.monthlyRate = (this.interest / 100) / 12;
    	this.numberOfPayments = this.years * 12;
  		this.monthlyPayment = ((this.monthlyRate * ((this.monthlyRate + 1) ** this.numberOfPayments)) / 
       (((this.monthlyRate + 1) ** this.numberOfPayments) - 1)) * (loanAmt);
    return this.monthlyPayment;
  }

  	getNumberOfPayments(){
  	return this.numberOfPayments = this.years * 12;
  }


}