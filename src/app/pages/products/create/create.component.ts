import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../material.module';
import { MatInput, MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryService } from '../../categories/category.service';
import { response } from 'express';
import { data } from 'jquery';
import { Observable, map, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule,
            CommonModule,
            ToastrModule,
            RouterLink,
            MaterialModule,
            MatInput,
            AsyncPipe,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatAutocompleteModule,
            MatButtonModule
            ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
 productForm : FormGroup;
 isFormSubmitted: boolean = false;
 options: any;
 option: any;
 filteredOptions!: Observable<string[]>;
 constructor(
  private http: HttpClient,
  private toastr: ToastrService,
  private categoryService: CategoryService,
  private fb: FormBuilder,

  ) {
  this.productForm = new FormGroup({
    productCode: new FormControl("", [Validators.required]),
    productName: new FormControl("", [Validators.required, Validators.minLength(5)]),
    productPrice: new FormControl(""),
    quantity: new FormControl(""),
    category_id: new FormControl("")
  });
  }

  onSubmit() {
    const isFormValid = this.productForm.valid;
    const obj = this.productForm.value;
    this.isFormSubmitted = true;

    if (isFormValid) {
      this.http.post('http://192.168.191.235:8000/api/products/store', obj).subscribe((res: any) => {
        console.log(obj);
        alert(res.message);
        this.productForm.reset();
        this.toastr.success('Product Create Successfylly');
      });
    }
  }


  title = 'autocomplete';

  ngOnInit(){
    this.getCategory();
  }
  getCategory(){
    this.categoryService.getAll().subscribe((result) => {
      return this.options = result.categories;
    })
  }
  // initForm(){

  //     this.fillterData(response);

  // }
  // fillterData(enteredData){
  //   this.data = this.data.filter(item =>{

  //   })
  // }

  // ngOnInit() {
  //   this.filteredOptions = this.productForm.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filter(value || '')),
  //   );
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options;
  // }

}
