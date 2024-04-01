import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-categories-index',
  standalone: true,
  imports: [ReactiveFormsModule,
            RouterLink,
            CommonModule,
            ToastrModule,
            DataTablesModule,
            NgSelectModule
            ],
  templateUrl: './categories-index.component.html',
  styleUrl: './categories-index.component.css'
})
export class CategoriesIndexComponent implements OnInit{
 categoryForm: FormGroup;
 data: any =[];
 dtoptions: DataTables.Settings={};

 constructor(
  private http: HttpClient,
  private toastr: ToastrService,
  private categoryService: CategoryService
 ){
    this.categoryForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers'
    }
      this.fetchData();
  }
  fetchData() {
    this.categoryService.getAll().subscribe((result: any) => {
      this.data = result.categories;
    })
  }
  onSubmit(){
    const obj = this.categoryForm.value;
    this.categoryService.create(obj).subscribe((res: any)=>{
      this.categoryForm.reset();
      this.toastr.success('Category Created.');
      this.fetchData();
    });


  }
}
