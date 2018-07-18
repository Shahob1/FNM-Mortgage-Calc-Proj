/* tslint:disable:class-name component-class-suffix */
import { Component, AfterContentInit } from '@angular/core';
import * as d3 from 'd3-3';
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
               .columns(['Month', 'Payment', 'Principal', 'Interest', 'Balance'])
               .sortBy(function (d) {
                  return d["Month"];
               })
               .order(d3.ascending);

            table.render();


        });
    }

    

}