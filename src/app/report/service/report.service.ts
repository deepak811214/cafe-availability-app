import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportService {

  constructor(private http: Http) { }

  getData() : Observable<any>{
   // const URL = 'http://13.59.165.166/people/event/log';
    const URL = 'http://13.59.165.166/people/count';
    return this.http.get(URL).map(
      res => {
        const data = res.json();
        return data;
      }
    )

  }
  
}



