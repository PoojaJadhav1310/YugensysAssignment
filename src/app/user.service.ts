import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { throwError as ObservableThrowError, Observable, concat } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }


  getSuggestion(info): Observable<any> {
    const apiUrl =
      "http://localhost:1337/product?info=" +
      info;
    return this.http
      .get(apiUrl)
      .pipe(catchError((error) => this._handleError(error)));
  }
  updateInfoData(
    infotxt,
    selectedfruit
  ): Observable<any> {
    let body = {
      "infotxt": infotxt,
      "selectedfruit": selectedfruit
    };
    console.log("body:", body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    let options = {
      headers: headers,
    };
    return this.http
      .post(
        "http://localhost:8080/addData","&infotxt=" + infotxt +  "&selectedfruit=" + selectedfruit,
        {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      )
      .pipe(
        map(this.extractData),
        catchError((error) => this._handleError(error))
      );
  }
  private _handleError(error: any): import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }
  extractData(extractData: any): import("rxjs").OperatorFunction<Object, unknown> {
    throw new Error('Method not implemented.');
  }
}
