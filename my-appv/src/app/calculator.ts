import { Component } from '@angular/core';


export class Calculator {

  public principal: number;
  public downpayment: number;
  public interest: number;
  public years: number;

  // calculated values
  public monthlyRate: number;
  public numberOfPayments: number;
  public monthlyPayment: number;

  constructor(){}

  calculateMortgage()
  {

  		// calculated values 
    	this.monthlyRate = (this.interest / 100) / 12;
    	this.numberOfPayments = this.years * 12;
  		this.monthlyPayment = ((this.monthlyRate * ((this.monthlyRate + 1) ** this.numberOfPayments)) / 
       (((this.monthlyRate + 1) ** this.numberOfPayments) - 1)) * (this.principal-this.downpayment);


       console.log(this.monthlyPayment);
      
        return this.monthlyPayment.toLocaleString('en-us', {minimumFractionDigits: 2});

  }

  calculateInterest()
  {

    var totalInterest = (this.monthlyPayment * this.numberOfPayments) - this.principal;

       return totalInterest.toLocaleString('en-us', {minimumFractionDigits: 2});
  
  }

  calculateTotal()
  {

    var totalCost = this.monthlyPayment * this.numberOfPayments;

       return totalCost.toLocaleString('en-us', {minimumFractionDigits: 2});

  }


}