import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule,

            ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit{

  @Input() text! : string;
  @Input() btnClass! : string;
  // @Output()



  constructor(){}

  ngOnInit(): void {

  }

}
