import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../product/products.service';
import { ToastrService } from 'ngx-toastr';
import { VoidButtonComponent } from "../../component/void-button/void-button.component";

@Component({
    selector: 'app-view-product',
    standalone: true,
    templateUrl: './view-product.component.html',
    styleUrl: './view-product.component.css',
    imports: [CommonModule, RouterLink, VoidButtonComponent]
})
export class ViewProductComponent {

  product!: any;
  productId!: any;
  constructor(private ProductSer:ProductsService,
              private route:ActivatedRoute,
              private toastr: ToastrService,
    ){}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.ProductSer.getProduct(this.productId).subscribe((res: any)=>{
      // console.log(res.product);
      this.product = res.product;
    })
  }

  // ..............................................

  activeImage: string = '';


  onMouseOver(image: string): void {
    this.activeImage = image;
  }


}
