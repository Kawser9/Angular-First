import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../product/products.service';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
            CommonModule,
            RouterLink,
            MatButtonModule,
            MatButtonModule,
            MatAutocompleteModule,
            MatFormFieldModule,
            MatInputModule
          ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  product!: any;
  productId!: any;
  productForm! : FormGroup;
  isFormSubmitted: boolean = false;

  constructor(
    private route:ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private ProductSer: ProductsService
    ) {
      // this.productForm = new FormGroup({
      //   productCode: new FormControl("", [Validators.required]),
      //   productName: new FormControl("", [Validators.required, Validators.minLength(5)]),
      //   productPrice: new FormControl(""),
      //   quantity: new FormControl("")
      // });
  }
  ngOnInit(){
    this.productId = this.route.snapshot.paramMap.get('id');
    // alert(this.productId);
    this.ProductSer.getProduct(this.productId).subscribe((res: any)=>{
      // console.log(res);
      this.product = res;
      this.productForm = new FormGroup({
        productCode: new FormControl(res.product.productCode, [Validators.required]),
        productName: new FormControl(res.product.productName, [Validators.required, Validators.minLength(5)]),
        productPrice: new FormControl(res.product.productPrice),
        quantity: new FormControl(res.product.quantity),
        category_name: new FormControl(res.product.category_name)
      });
    })
  }

  onUpdate(){
    const isFormValid = this.productForm.valid;
    const obj = this.productForm.value;
    this.isFormSubmitted = true;
    if (isFormValid) {
      this.ProductSer.updateProduct(this.productId, obj).subscribe((res: any) => {
        this.toastr.success('Product Updated Successfylly');
      })
    }
  }
}
