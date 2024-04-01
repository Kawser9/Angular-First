import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../product/products.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';
import { VoidButtonComponent } from "../../../component/void-button/void-button.component";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    standalone: true,
    imports: [CommonModule,
        RouterLink,
        NgSelectModule,
        ReactiveFormsModule,
        DataTablesModule,
        ToastrModule,
        MatButtonModule, VoidButtonComponent]
})
export class IndexComponent implements OnInit {
  data: any = [];
  post: any;
  dtoptions: DataTables.Settings={};

  constructor (private productSer: ProductsService,
              public toastr: ToastrModule) {}

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers'
    }
    this.fetchData();
  }

  fetchData() {
    this.productSer.getAll().subscribe((result) => {
      this.data = result.products;
      // console.log(this.data);
    });
  }
  deleteProduct(event:any, productId: number)
    {
    if (confirm('Are you sure to delete this product?'))
      {
        event.target.innerText = "Deleting...";
        this.productSer.destroyProduct(productId).subscribe((res : any) =>
        {
          this.fetchData();
          // alert(res.message);
        })
      }
    }
}
