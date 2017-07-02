import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportService {

  constructor(private http: Http) { }

  getData() : Observable<any>{

   // const URL ='https://deepak19bit.000webhostapp.com/get.php';
    const URL ='https://api.github.com/search/users?q=user';
    console.log(URL);
    return this.http.get(URL).map(
      res => {
        const data = res.json();
        console.log(res);
        return data;
      }
    )

  }
  
}



