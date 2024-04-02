import { Component, OnInit } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { ProductsService } from '../../product/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VoidButtonComponent } from '../../component/void-button/void-button.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,RouterLink, VoidButtonComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  data?: any;
  constructor (private productSer: ProductsService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.productSer.getAll().subscribe((result) => {
      this.data = result.products;
      console.log(this.data);
    });
  }

}
