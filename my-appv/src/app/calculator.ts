export class Calculator {

  totalPrincipal: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  


  constructor(totalPrincipal: number, downPayment: number, interestRate: number, loanTerm: number)
  {
    this.totalPrincipal = totalPrincipal;
    this.downPayment=downPayment;
    this.interestRate = interestRate;
    this.loanTerm = loanTerm;

  }


  calculateMortgage()
  {
     var monthlyRate = (this.interestRate/100)/12;
     var numberOfPayments = this.loanTerm * 12;
     var monthlyPayment = ((monthlyRate * ((monthlyRate + 1) ^ numberOfPayments)) / 
        (((monthlyRate + 1) ^ numberOfPayments) - 1));
    
        return monthlyPayment;
  }


  calculateInterest()
  {


  
  }

  calculateTotal()
  {



  }


}