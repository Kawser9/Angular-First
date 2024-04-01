import { Component } from '@angular/core';
import { VoidButtonComponent } from "../void-button/void-button.component";

@Component({
    selector: 'app-buttons',
    standalone: true,
    templateUrl: './buttons.component.html',
    styleUrl: './buttons.component.css',
    imports: [VoidButtonComponent]
})
export class ButtonsComponent {

}
