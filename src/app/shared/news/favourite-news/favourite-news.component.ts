import {Component, Input, OnInit} from '@angular/core';
import {INews, NewsService} from "../services/news.service";
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-favourite-news',
  templateUrl: './favourite-news.component.html',
  styleUrls: ['./favourite-news.component.sass']
})
export class FavouriteNewsComponent implements OnInit {
  public subscription: Subscription;
  public errorMessage: string;
  public dataFavNews: Array<string>

  constructor(public newsServer: NewsService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.receiveFavouriteNews();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public receiveFavouriteNews(): void {
    this.subscription = this.newsServer.getFavouriteNews().subscribe({
      next: (data) => {
        this.dataFavNews = data.news;
        console.log(this.dataFavNews);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        alert(this.errorMessage);
      },
      complete: () => {
      }
    })
  }
}