/* tslint:disable:class-name component-class-suffix */
import { Component, AfterContentInit } from '@angular/core';
import * as d3 from 'd3';
import * as crossfilter from 'crossfilter2';
import * as dc from 'dc';
import { Calculator } from './calculator';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html'

})
export class CalcComponent implements AfterContentInit{
    mortgageCalc = new Calculator(400000, 0.2, .0035, 30)

    submitted = false;

    onSubmit() { this.submitted = true; }

    get diagnostic() {
        return JSON.stringify(this.mortgageCalc);
    }

    ngAfterContentInit(): void {
        var chart = dc.seriesChart("#time-series");

        d3.csv("amort.csv").then(function(data) {
            var format = d3.time.format("%B  %Y");
            data.forEach(function(d) {
                d.date = format(d.date);
            });
            var ndx = crossfilter(data);
            var dimension = ndx.dimension(function(d) {return d['Date']; });
            var group = dimension.group().reduceSum(function(d) { return +d['Interest']; });

            chart
               .width(800)
               .height(300)
               .brushOn(false)
               .yAxisLabel("Dollars")
               .xAxisLabel("Date")
               .dimension(dimension)
               .group(group)
            chart.render();


        });
    }

    

}