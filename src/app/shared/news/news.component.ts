import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";
import {INews, NewsService} from "./services/news.service";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit, AfterViewInit, OnDestroy {

  public news: INews[];
  public displayedColumns: string[];
  public subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public newsService: NewsService) {
   this.displayedColumns = ['id', 'title', 'country', 'link'];
   this.subscription = new Subscription();
  }


  ngOnInit(): void {
    /*this.getNews();*/
  }

  ngAfterViewInit() {
    this.getNews();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getNews(): void {
    this.subscription = this.newsService.getNews().subscribe({
      next: (data) => {
        console.log(data);
        this.news = data;

      },
      error: (error) => {
        console.log(error.error)
      },
      complete: () => {
      }
    })
  }

}
