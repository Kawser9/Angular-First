import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { VoidButtonComponent } from "../../../component/void-button/void-button.component";

@Component({
    selector: 'app-upload-excel',
    standalone: true,
    templateUrl: './upload-excel.component.html',
    styleUrl: './upload-excel.component.css',
    imports: [ReactiveFormsModule,
        CommonModule,
        ToastrModule,
        RouterLink,
        FormsModule,
        VoidButtonComponent]
})
export class UploadExcelComponent implements OnInit {
  excel!: FormGroup;
  ngOnInit() {

  };
}
