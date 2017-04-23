import { Component } from '@angular/core';

@Component({
  inputs: [ 'model' ],
  selector: 'contact',
  templateUrl: './contact.html',
})
export class Contact {
    public dummy: string = '';
}