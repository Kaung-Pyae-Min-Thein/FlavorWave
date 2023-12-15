import { Component, Input } from '@angular/core';
import { Preorder } from 'src/app/models/preorder';

@Component({
  selector: 'app-sales-stepper',
  templateUrl: './sales-stepper.component.html',
  styleUrls: ['./sales-stepper.component.css']
})
export class SalesStepperComponent {
  @Input() data!: Preorder;

  ngOnInit() {
    const role = sessionStorage.getItem('role');

    console.log(this.data);


  }

}
