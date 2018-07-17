import { Component, OnInit } from '@angular/core';


export class Calculator {

// calculated values
public monthlyRate: any;
public numberOfPayments: number;
public monthlyPayment: number;

  constructor(
    public principal: number,
    public downpayment: number,
    public interest: number,
    public years: number,
  ) {
    this.monthlyRate = (this.interest / 100) / 12;
    this.numberOfPayments = this.years * 12;
    this.monthlyPayment = ((this.monthlyRate * ((this.monthlyRate + 1) ** this.numberOfPayments)) / 
       (((this.monthlyRate + 1) ** this.numberOfPayments) - 1)) * (this.principal);
  }
  


  // constructor(principal: number, downpayment: number, interest: number, years: number)
  // {
    // this.principal = principal;
    // this.downpayment = downpayment;
    // this.interest = interest;
    // this.years = years;

    // calculated values 
  // }

  // getters
  getPrincipal()
  {
    return this.principal;
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
  getMonthlyPayment()
  {
    return this.monthlyPayment;
  }


  // methods
  calculateMortgageString()
  {
        return this.monthlyPayment.toLocaleString('en-us', {minimumFractionDigits: 2});

  }  
  calculateMortgage()
  {
        return this.monthlyPayment;

  }

  calculateInterest()
  {

    var totalInterest = (this.monthlyPayment * this.numberOfPayments) - this.principal;

       return totalInterest.toLocaleString('en-us', {minimumFractionDigits: 2});
  
  }

  calculateTotalString()
  {

    var totalCost = this.monthlyPayment * this.numberOfPayments;

       return totalCost.toLocaleString('en-us', {minimumFractionDigits: 2});

  }  
  
  calculateTotal()
  {

    var totalCost = this.monthlyPayment * this.numberOfPayments;

       return totalCost;

  }


}