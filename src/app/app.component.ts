import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterOutlet ,RouterLink} from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { app } from '../../server';
import { HttpClientModule } from '@angular/common/http';
import { VoidButtonComponent } from "./component/void-button/void-button.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule,
        RouterOutlet,
        RouterModule,
        RouterLink,
        ReactiveFormsModule,
        NgSelectModule,
        DataTablesModule,
        FormsModule,
        HttpClientModule, VoidButtonComponent]
})
export class AppComponent {
  title = 'First-Angular-CRUD';
}
