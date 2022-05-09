import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FBAuthResponse, User} from "../../shared/components/interfaces";
import {Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  get token(): string | null{
    // @ts-ignore
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login (user: User): Observable<any> {
    /*user.returnSecureToken = true;*/
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FBAuthResponse | null | any){
    if (response) {
      const exDate = new Date(new Date().getTime() + +response.expiresIn*1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', exDate.toString());
    }
    else {
      localStorage.clear();
    }
  }
}
