/* tslint:disable:class-name component-class-suffix */
import { Component } from '@angular/core';

import { Calculator } from './calculator';

@Component({
  selector: 'app-calc',
  templateUrl: './app.component.html'

})
export class CalcComponent {
    mortgageCalc = new Calculator(400000, 0.2, .0035, 30)

    submitted = false;

    onSubmit() { this.submitted = true; }

}