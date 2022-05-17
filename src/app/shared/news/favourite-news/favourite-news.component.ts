import {Component, Input, OnInit} from '@angular/core';
import {INews, NewsService} from "../services/news.service";
import {Subscription} from "rxjs";
import {NgxPaginationModule} from 'ngx-pagination';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-favourite-news',
  templateUrl: './favourite-news.component.html',
  styleUrls: ['./favourite-news.component.sass']
})
export class FavouriteNewsComponent implements OnInit {
  public subscription: Subscription;
  public errorMessage: string;
  public dataFavNews: Array<string> = [];
  public p: number = 1;

  constructor(public newsService: NewsService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.receiveFavouriteNews();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public receiveFavouriteNews(): void {
    this.subscription.add(this.newsService.getFavouriteNews().subscribe({
      next: (data) => {
        this.dataFavNews = data.news;
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        alert(this.errorMessage);
      },
      complete: () => {
      }
    }));
  }

  public deleteFavouriteNews(id: string): void {
    this.subscription.add(this.newsService.deleteFavouriteNews(id).subscribe({
      next: (data) => {
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        alert(this.errorMessage);
      },
      complete: () => {
        this.receiveFavouriteNews();
      }
    }));
  }
}
