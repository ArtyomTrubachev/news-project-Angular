import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

export interface INews {
  id: number;
  title: string;
  country:string;
  link: string;
  createdAt?: string;
  updatedAt?: string;
  email?: string | null;
  newsId?: string;
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

  public addNews(news: INews): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/news`, news);
  }

  public deleteNews(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/news/${id}`);
  }

  public editNews(news: INews): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/news/${news.id}`, news);
  }

  public addFavouriteNews(news: { newsId: any; email: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/addNewsToUser`, news);
  }

  public getFavouriteNews(): Observable<any> {
    let userEmail = localStorage.getItem('email');
    return this.http.get<any>(`${environment.apiUrl}/users/${userEmail}`);
  }

}

