import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SharedService {


  httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  };

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any[]> {

    return this.http.get<any[]>(url);



  }

  post(url: string, obj: any): Observable<any> {

    return this.http.post<any>(url, obj, this.httpOptions);



  }


}
