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
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
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


  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
