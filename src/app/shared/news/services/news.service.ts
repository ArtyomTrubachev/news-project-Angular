import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

export interface INews {
  id: number;
  title: string;
  country:string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(public http: HttpClient) {
  }

  public getNews(): Observable<INews[]> {
    return this.http.get<INews[]>( `${environment.apiUrl}/news`);
  }
}

