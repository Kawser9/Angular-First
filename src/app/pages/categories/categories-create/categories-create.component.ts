import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, startWith } from 'rxjs';
import { CategoryService } from '../category.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { VoidButtonComponent } from "../../../component/void-button/void-button.component";
import { RouterLink } from '@angular/router';

export interface Category {
  id: number;
  name: string;
}

@Component({
    selector: 'app-categories-create',
    standalone: true,
    templateUrl: './categories-create.component.html',
    styleUrl: './categories-create.component.css',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe,
        MatButtonModule,
        VoidButtonComponent,
        RouterLink,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class CategoriesCreateComponent implements OnInit {
  myControl = new FormControl<string | Category>('',[Validators.required]);
  options: Category[] =[];
  filteredOptions!: Observable<Category[]>;
  categories: any;
  formData:FormGroup;
  isFormSubmitted: boolean = false;

  constructor(private CategoryService: CategoryService,
    private http: HttpClient,
    private toastr: ToastrService,
  ){
    this.formData= new FormGroup({
      productCode: new FormControl("",[Validators.required, Validators.min(0)]),
      productName: new FormControl("",[Validators.required]),
      productPrice: new FormControl("",[Validators.required]),
      quantity: new FormControl("",[Validators.required]),
      frontImage: new FormControl("",[Validators.required]),
      sideImage: new FormControl(""),
      opening_value: new FormControl(""),
      reOrder_quantity: new FormControl(""),
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name) : this.options.slice();
      })
    );
    this.getCategory();
  }

  displayFn(user: Category): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Category[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onSubmit(event: any) {
    // debugger
    // const file1 = event.target.form[5].files[0];
    // const file2 = event.target.form[6].files[0];
    this.isFormSubmitted = true;
    const file1 = event.target.form.querySelector('[name="frontImage"]').files[0];
    const file2 = event.target.form.querySelector('[name="sideImage"]').files[0];

    // console.log(file2,file1);

    const formDataValue = this.formData.value;
    const category: Category = this.myControl.value as Category;
    const { id } = category;

    const formData = new FormData();
    formData.append('productCode',      formDataValue.productCode);
    formData.append('productName',      formDataValue.productName);
    formData.append('productPrice',     formDataValue.productPrice);
    formData.append('quantity',         formDataValue.quantity);
    formData.append('opening_value',    formDataValue.opening_value);
    formData.append('reOrder_quantity', formDataValue.reOrder_quantity);
    formData.append('category_id',      id.toString());
    formData.append('frontImage',       file1);
    formData.append('sideImage',        file2);


    this.http.post('http://192.168.191.235:8000/api/products/store', formData).subscribe(
      (res: any) => {
        console.log(res.status);

            this.toastr.success('Product Created Successfully');

      });

    // Reset the form controls
    this.formData.reset();
    this.myControl.reset();
  }


  onSubmitt(event: any) {
    const file1 = event.target.form[5].files[0].name;
    const file2 = event.target.form[6].files[0].name;
    // console.log(file1);
    // console.log(file2);
    const formDataValue = this.formData.value; // Assuming this.formData is your Angular FormGroup
    const category: Category = this.myControl.value as Category;

    // Destructure the category object
    const { id } = category;
    // const { id, name } = category;
    // const image={...file1, ...file2};
    // const { frontImage, sideImage } =  image;
    // console.log(image);

    // console.log('ID:', id);
    // console.log('Name:', name);

      const product = {
        ...formDataValue,
        category_id: id,frontImage:file1 ,sideImage:file2
      };

      // product.append('frontImage',file);

      // console.log('Combined Data:', product);

      this.http.post('http://192.168.191.235:8000/api/products/store', product).subscribe((res: any) => {
        console.log('Combined Data:', product);
        alert(res.message);
        this.toastr.success('Product Create Successfully');
      });

      // Reset the category form control to clear the selected value
      this.formData.reset();
      this.myControl.reset();
  }


  getCategory(){
    this.CategoryService.ddd().subscribe((result) => {
      this.options = result.categories;
      // console.log(this.options);
    })
  }
}
