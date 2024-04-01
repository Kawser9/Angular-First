import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  private baseurl: string = 'http://192.168.191.235:8000/api'


  ddd():Observable<any>{
    return this.http.get(`${this.baseurl}/categories/ddd`)
  }

  getAll():Observable<any>{
    return this.http.get(`${this.baseurl}/categories`)
  }
  create(obj: any){
    return this.http.post(`${this.baseurl}/categories/store`, obj)
  }



}
