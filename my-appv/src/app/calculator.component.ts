/* tslint:disable:class-name component-class-suffix */

import { Calculator } from './calculator';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import { Component, AfterContentInit } from '@angular/core';
import * as d3 from 'd3-3';
import * as crossfilter from 'crossfilter2';
import * as dc from 'dc';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']

})

export class CalcComponent implements AfterContentInit{
    mortgageCalc = new Calculator();
    amortizationTable = new Array(this.mortgageCalc.numberOfPayments);
    monthlyPay;
    totalInterest;
    totalCost;
    monthlyPay5Less;
    totalInterest5Less;
    totalCost5Less;
    monthlyPay5More;
    totalInterest5More;
    totalCost5More;
    
    loanAmount.value = 0;

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

        this.monthlyPay = this.mortgageCalc.getMonthlyPayment(loanAmountMain).toLocaleString('en-us', {maximumFractionDigits: 2});
        this.totalInterest = this.mortgageCalc.calculateInterest(loanAmountMain).toLocaleString('en-us', {maximumFractionDigits: 2});
        this.totalCost = this.mortgageCalc.calculateTotal(loanAmountMain).toLocaleString('en-us', {maximumFractionDigits: 2});

        // USE THESE NEXT 6 LINES FOR THE NEW OUTPUTS
        this.monthlyPay5Less = this.mortgageCalc.getMonthlyPayment(loanAmount5LessDown).toLocaleString('en-us', {maximumFractionDigits: 2});
        this.totalInterest5Less = this.mortgageCalc.calculateInterest(loanAmount5LessDown).toLocaleString('en-us', {maximumFractionDigits: 2});
        this.totalCost5Less = this.mortgageCalc.calculateTotal(loanAmount5LessDown).toLocaleString('en-us', {maximumFractionDigits: 2});

        this.monthlyPay5More = this.mortgageCalc.getMonthlyPayment(loanAmount5MoreDown).toLocaleString('en-us', {maximumFractionDigits: 2});
        this.totalInterest5More = this.mortgageCalc.calculateInterest(loanAmount5MoreDown).toLocaleString('en-us', {maximumFractionDigits: 2});
        this.totalCost5More = this.mortgageCalc.calculateTotal(loanAmount5MoreDown).toLocaleString('en-us', {maximumFractionDigits: 2});

        this.createViz();
        return JSON.stringify(this.mortgageCalc);
    }

    sMcalculator(){
        return this.mortgageCalc.loanAmount;
    }

    calculateAmortization()
    {
        this.amortizationTable = new Array(this.mortgageCalc.getNumberOfPayments()); 
        console.log("number of payments" + this.mortgageCalc.getNumberOfPayments());

        
        var i: number;
        this.mortgageCalc.loanAmount = loanAmount.value;
        var currBalance = this.mortgageCalc.loanAmount;
        var monthlyPayment = this.mortgageCalc.getMonthlyPayment(currBalance);
        var numberOfPayments = this.mortgageCalc.getNumberOfPayments();
        var monthlyRate = this.mortgageCalc.getMonthlyRate();

        this.amortizationTable[0]= 
        {
            month : 0,
            payment : "0",
            principal : "0",
            interest : "0",
            balance : currBalance.toLocaleString('en-us', {maximumFractionDigits: 2}),
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
            balance : currBalance.toLocaleString('en-us', {maximumFractionDigits: 2}),
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

    return new Angular5Csv(table, 'My Report', options);
}

filterAll() {
        dc.filterAll();
        dc.redrawAll();
    }

    createViz() {
        dc.filterAll();
        dc.redrawAll();
        d3.select("#time-series").style("display","block");
        d3.select("#table1").style("display","block");
        var chart = dc.compositeChart("#time-series");
        var table = dc.dataTable("#table");
        var data = this.calculateAmortization();
        //d3.csv("./assets//amort2.csv",function(data1) {
            //var format = d3.time.format("%B%Y");
        
        //data.shift();
        //console.log(data[0]);
        //console.log(data1[1]);
            data.forEach(function(d) {
                //console.log(format.parse (d["Date"]));
                //d["Date"] = format.parse((d["Date"]));
                d.month = d.month;
                d.payment = parseFloat(d.payment.replace(/,/g ,'')).toFixed(2);
                d.interest = parseFloat(d.interest.replace(/,/g ,'')).toFixed(2);
                d.principal = parseFloat(d.principal.replace(/,/g ,'')).toFixed(2);
                d.balance = parseFloat(d.balance.replace(/,/g ,'')).toFixed(2);
            });
            var ndx = crossfilter(data);
            var dimension = ndx.dimension(function(d) {return (d.month); });
            var group1 = dimension.group().reduceSum(function(d) { return d.interest; });
            var group2 = dimension.group().reduceSum(function(d) { return d.principal; });
            //console.log(group1);
            table
               .dimension(dimension)
               .group(function(d) { return ""})
               .size(Infinity)
               .columns([function(d) { return d.month;},
                function(d) { return d.payment;},
                function(d) { return d.principal;},
                function(d) { return d.interest;},
                function(d) { return d.balance;},])
               .sortBy(function (d) {
                  return d.month;
               })
               .renderlet(function(chart){
                    chart.select('tbody')
                        .style('overflow-y', 'scroll')
                        .style('display', 'block')
                        .style('height', '410px')
                        .style('width', '100%');
                    chart.selectAll('td, th')
                        .style('border', '1px solid #ddd')
                        .style('padding', '8px');
                        //.style('width', '100%');
                    chart.selectAll('tr:nth-child(even)')
                        .style('background-color','#f2f2f2');
                    chart.selectAll('tr:hover')
                        .style('background-color','#ddd');
                    chart.selectAll('tr')
                        .style('display', 'table')
                        .style('table-layout', 'fixed')
                        .style('width', '100%');
                    chart.selectAll('tr.dc-table-group')
                        .style('display','none');
                    
               })
               .order(d3.ascending);

            table.render();

            chart
               .width(800)
               .height(300)
               //.dimension(dimension)
               .colors('red')
               //.group(group1, "Interest")
               .brushOn(true)
               .yAxisLabel("Dollars")
               .xAxisLabel("Term (Months)")
               .elasticY(true)
               .margins({top:0,bottom:50,right:0,left:60})
               //.elasticX(true)
               .x(d3.scale.linear().domain(d3.extent(data, function(d) {
                    return ((d.month));
                })))
                .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
                .compose([
                    dc.barChart(chart)
                        .dimension(dimension)
                        .colors('red')
                        .group(group1, "Interest"),
                        //.dashStyle([2,2]),
                    dc.barChart(chart)
                        .dimension(dimension)
                        .colors('blue')
                        .group(group2, "Principal")
                        //.dashStyle([2,2])
                    ])
            chart.render();
            //dc.renderAll();

        //});
    }

    ngAfterContentInit(): void {
        

        var data = this.amortizationTable;
        if(data[1] == null) {
            d3.select("#time-series").style("display","none");
            d3.select("#table1").style("display","none");
        }
        
    }

}
