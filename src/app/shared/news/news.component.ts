import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";
import {INews, NewsService} from "./services/news.service";
import {MatDialog} from "@angular/material/dialog";
import {AddNewsComponent} from "./add-news/add-news.component";


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

  constructor(public newsService: NewsService, public dialog: MatDialog) {
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

 public addNews(): void {
    console.log('Новость добавлена');
   const dialogRef = this.dialog.open(AddNewsComponent, {
     width: '450px',
     height: '450px',
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('Модалка закрылась');
     this.getNews();
   });
  }
}
