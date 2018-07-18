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

    


    constructor(){}

    submitted = false;

    onSubmit() { this.submitted = true; }

    diagnostic() {
    console.log("calculateMortgage:" + this.mortgageCalc.years);
    	console.log("calculateMortgage:" + this.mortgageCalc.getMonthlyPayment());
    	console.log("calculateInterest:" + this.mortgageCalc.calculateInterest());
    	console.log("calculateTotalCost:" + this.mortgageCalc.calculateTotal());
        return JSON.stringify(this.mortgageCalc);
    }

    sMcalculator(){
    	return this.mortgageCalc.loanAmount;
    }

    calculateAmortization()
    {
        //var home = new Calculator(this.mortgageCalc.principal, this.mortgageCalc.downPayment, this.mortgageCalc.interest, this.mortgageCalc.years);
        console.log("number of payments" + this.mortgageCalc.getNumberOfPayments());

        
        var i: number;
        var currBalance = this.mortgageCalc.loanAmount;
        var monthlyPayment = this.mortgageCalc.getMonthlyPayment();
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

	new Angular5Csv(table, 'My Report', options);
}

filterAll() {
        dc.filterAll();
        dc.redrawAll();
    }

    ngAfterContentInit(): void {
        var chart = dc.compositeChart("#time-series");
        var table = dc.dataTable("#table");

        d3.csv("./assets//amort2.csv",function(data) {
            //var format = d3.time.format("%B%Y");
            data.forEach(function(d) {
                //console.log(format.parse (d["Date"]));
                //d["Date"] = format.parse((d["Date"]));
                d["Month"] = +d["Month"];
                d["Interest"] = +d["Interest"];
                d["Principal"] = +d["Principal"];
            });
            var ndx = crossfilter(data);
            var dimension = ndx.dimension(function(d) {return (d["Month"]); });
            var group1 = dimension.group().reduceSum(function(d) { return d["Interest"]; });
            var group2 = dimension.group().reduceSum(function(d) { return d["Principal"]; });

            chart
               .width(800)
               .height(300)
               .brushOn(true)
               .yAxisLabel("Dollars")
               .xAxisLabel("Term")
               .elasticY(true)
               //.elasticX(true)
               .x(d3.scale.linear().domain(d3.extent(data, function(d) {
                    return ((d["Month"]));
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

            table
               .dimension(dimension)
               .group(function(d) { return ""})
               .size(Infinity)
               .columns([function(d) { return d["Month"];},
                function(d) { return d["Payment"];},
                function(d) { return d["Principal"];},
                function(d) { return d["Interest"];},
                function(d) { return d["Balance"];},])
               .sortBy(function (d) {
                  return d["Month"];
               })
               .renderlet(function(chart){
                    chart.selectAll('td, th')
                        .style('border', '1px solid #ddd')
                        .style('padding', '8px');
                        //.style('width', '100%');
                    chart.selectAll('tr:nth-child(even)')
                        .style('background-color','#f2f2f2');
                    chart.selectAll('tr:hover')
                        .style('background-color','#ddd');
                    chart.selectAll('tr.dc-table-group')
                        .style('display','none');
                    
               })
               .order(d3.ascending);

            table.render();


        });
    }

}
