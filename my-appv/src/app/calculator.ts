import { Component } from '@angular/core';


export class Calculator {

  public principal: number;
  public downpayment: number;
  public interest: number;
  public years: number;
  public loanAmount: number;

  // calculated values
  public monthlyRate: number;
  public numberOfPayments: number;
  public monthlyPayment: number;

  constructor(){

  }

  calculateMortgage()
  {
      
        return this.getMonthlyPayment().toLocaleString('en-us', {minimumFractionDigits: 2});

  }


  calculateInterest()
  {

    var totalInterest = (this.getMonthlyPayment() * this.getNumberOfPayments()) - this.loanAmount;

       return totalInterest.toLocaleString('en-us', {minimumFractionDigits: 2});
  
  }

  calculateTotal()
  {

    var totalCost = this.getMonthlyPayment() * this.getNumberOfPayments();

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

  getMonthlyPayment()
  {
  		this.monthlyRate = (this.interest / 100) / 12;
    	this.numberOfPayments = this.years * 12;
  		this.monthlyPayment = ((this.monthlyRate * ((this.monthlyRate + 1) ** this.numberOfPayments)) / 
       (((this.monthlyRate + 1) ** this.numberOfPayments) - 1)) * (this.loanAmount);
    return this.monthlyPayment;
  }

  	getNumberOfPayments(){
  	return this.numberOfPayments = this.years * 12;
  }


}