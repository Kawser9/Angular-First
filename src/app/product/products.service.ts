import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

constructor(private http: HttpClient) { }

 private baseurl: string = 'http://192.168.191.235:8000/api'

  getAll():Observable<any>{
    return this.http.get(`${this.baseurl}/products`)
  }
  getProduct(productId: any){
    return this.http.get(`${this.baseurl}/products/${productId}`)
  }
  updateProduct(productId: any, obj: any){
    return this.http.put(`${this.baseurl}/products/update/${productId}`, obj)
  }
  destroyProduct(productId: number) {
    return this.http.delete(`${this.baseurl}/products/delete/${productId}`)
    console.log(productId);
  }
}
