import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-void-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './void-button.component.html',
  styleUrl: './void-button.component.css'
})
export class VoidButtonComponent implements OnInit{

  @Input() text! : string;
  @Input() btnClass! : string;


  constructor(){}
ngOnInit(): void {

}
}
