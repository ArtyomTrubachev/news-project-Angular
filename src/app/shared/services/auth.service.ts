import { Injectable } from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IUser} from "../models/user";
import {Token} from "../models/token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public registration(user: IUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/registration`, user)
  }

  public login(user: IUser): Observable<Token> {
    return this.http.post<Token>(`${environment.apiUrl}/auth/login`, user)
      .pipe(
        map( response => response),
        tap(this.setToken),
      )
  }

  public setToken(response: Token) {
    if (response) {
      localStorage.setItem('token', response.token);

    } else {
      localStorage.clear();
    }
  }
}
