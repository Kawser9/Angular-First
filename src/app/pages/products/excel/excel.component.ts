import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoidButtonComponent } from "../../../component/void-button/void-button.component";
import { RouterLink } from '@angular/router';
import { File } from 'buffer';

import * as XLSX from 'xlsx';
import { CategoryService } from '../../categories/category.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
const { read, write, utils } = XLSX;
type AOA = any[][];
@Component({
    selector: 'app-excel',
    standalone: true,
    templateUrl: './excel.component.html',
    styleUrl: './excel.component.css',
    imports: [ReactiveFormsModule,
        CommonModule,
        FormsModule,
        RouterLink,
        VoidButtonComponent,
      ]
})
export class ExcelComponent {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private fb: FormBuilder,

    ) {}
  data: AOA = [ ];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChangee(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      // console.log("data:",this.data);
      // this.data.map(res=>{
      //   if(res[0] === "no"){
      //     console.log(res[0]);
      //   }else{
      //     console.log(res[0]);
      //   }
      // })
    };
    reader.readAsBinaryString(target.files[0]);
    const obj = this.data;
    this.http.post('http://192.168.191.235:8000/api/products/store', this.data).subscribe((res: any) => {
        console.log(this.data);
        alert(res.message);
        this.toastr.success('Product Create Successfylly');
      });
  }
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const jsonData: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Assuming each row represents product data
      const productsData = jsonData.map((row: any) => {
        return {
          productCode: row[0],
          productName: row[1],
          quantity: row[2],
          description: row[3],
          status: row[4],
          discount: row[5],
          productPrice: row[7],
          productImage: row[8],
          category_id: row[11],
          frontImage: row[12],
          sideImage: row[13],
          total: row[14],
          opening_value: row[15],
          reOrder_quantity: row[16],
        };
      });


      this.http.post('http://192.168.191.235:8000/api/products/excel',productsData).subscribe((res: any) => {
        console.log(productsData);



        // Assuming res.message is the object containing multiple messages
        const messageObject: any = res.error;
        for (const key in messageObject) {
            if (Object.prototype.hasOwnProperty.call(messageObject, key)) {
                const message: string = messageObject[key];

                // Show the message using toastr or any other toast notification library
                this.toastr.warning(message);

                // Log the message to the console
                console.log(message);
            }
        }
        const message: string = res.message;
        this.toastr.success(message);
        console.log(message);
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }


}
