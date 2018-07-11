/* tslint:disable:class-name component-class-suffix */
import { Component } from '@angular/core';

@Component({
  selector: 'app-key-up',
  template: `
    <input (keyup)="onKey($event)">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent {
  values = '';

  /*
  onKey(event: any) { // without type info
    this.values += event.target.value + ' | ';
  }
  */

  onKey(event: KeyboardEvent) { // with type info
    this.values += (<HTMLInputElement>event.target).value + ' | ';
  }
}