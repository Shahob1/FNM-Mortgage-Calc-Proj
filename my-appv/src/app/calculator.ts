import { Component } from '@angular/core';


export class Calculator {

  public totalPrincipal: number;
  public downPayment: number;
  public interestRate: number;
  public loanTerm: number;
  public monthlyPayment: number;
  


  constructor(totalPrincipal: number, downPayment: number, interestRate: number, loanTerm: number)
  {
    this.totalPrincipal = totalPrincipal;
    this.downPayment = downPayment;
    this.interestRate = interestRate;
    this.loanTerm = loanTerm;

    var monthlyRate = (this.interestRate/100)/12;
    var numberOfPayments = this.loanTerm * 12;
    var monthlyPayment = ((monthlyRate * ((monthlyRate + 1) ** numberOfPayments)) / 
       (((monthlyRate + 1) ** numberOfPayments) - 1));

  }

  calculateMortgage()
  {
     var monthlyRate = (this.interestRate/100)/12;
     var numberOfPayments = this.loanTerm * 12;
     var monthlyPayment = ((monthlyRate * ((monthlyRate + 1) ** numberOfPayments)) / 
        (((monthlyRate + 1) ** numberOfPayments) - 1)) * (this.totalPrincipal-this.downPayment);
      
        return monthlyPayment.toLocaleString('en-us', {minimumFractionDigits: 2});

  }

  calculateInterest()
  {
    var monthlyRate = (this.interestRate/100)/12;
    var numberOfPayments = this.loanTerm * 12;
    var monthlyPayment = ((monthlyRate * ((monthlyRate + 1) ** numberOfPayments)) / 
       (((monthlyRate + 1) ** numberOfPayments) - 1)) * (this.totalPrincipal-this.downPayment);
    var totalInterest = (monthlyPayment * numberOfPayments) - this.totalPrincipal;

       return totalInterest.toLocaleString('en-us', {minimumFractionDigits: 2});
  
  }

  calculateTotal()
  {
    var monthlyRate = (this.interestRate/100)/12;
    var numberOfPayments = this.loanTerm * 12;
    var monthlyPayment = ((monthlyRate * ((monthlyRate + 1) ** numberOfPayments)) / 
       (((monthlyRate + 1) ** numberOfPayments) - 1)) * (this.totalPrincipal-this.downPayment);
    var total = monthlyPayment * numberOfPayments;

       return total.toLocaleString('en-us', {minimumFractionDigits: 2});

  }


}