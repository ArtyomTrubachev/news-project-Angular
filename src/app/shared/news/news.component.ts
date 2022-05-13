import {AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";
import {INews, NewsService} from "./services/news.service";
import {MatDialog} from "@angular/material/dialog";
import {AddNewsComponent} from "./add-news/add-news.component";
import {EditNewsComponent} from "./edit-news/edit-news.component";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit, AfterViewInit, OnDestroy {

  public news: MatTableDataSource<INews>;
  public displayedColumns: string[];
  public subscription: Subscription;
  public errorMessage: string;

  @ViewChild('paginator') paginator: MatPaginator;


  constructor(public newsService: NewsService, public dialog: MatDialog, public renderer: Renderer2) {
   this.displayedColumns = ['id', 'title', 'country', 'link', 'btnChange', 'btnDelete', 'btnFavourite'];
   this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getNews();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getNews(): void {
    this.subscription.add(this.newsService.getNews().subscribe({
      next: (data) => {
        this.news = new MatTableDataSource<INews>(data);
        this.news.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error.error)
      },
      complete: () => {
      }
    }));
  }

 public addNews(): void {
    console.log('Новость добавлена');
   const dialogRef = this.dialog.open(AddNewsComponent, {
     width: '650px',
     height: '450px',
   });

   dialogRef.afterClosed().subscribe(result => {
     this.getNews();
   });
  }

  public changeNews(element: INews): void {
    const dialogRef = this.dialog.open(EditNewsComponent, {
      width: '650px',
      height: '450px',
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getNews();
    });
  }

  public deleteNews(id: string): void {
    this.subscription.add(this.newsService.deleteNews(id).subscribe({
      next: (data) => {
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        alert(this.errorMessage);
      },
      complete: () => {
        this.getNews();
      }
    }));
  }

  public addToFavouriteNews(element): void {
    let dataForFavourServ = {
      email: localStorage.getItem('email'),
      newsId: element.id
    }
    this.subscription.add(this.newsService.addFavouriteNews(dataForFavourServ).subscribe({
      next: (data) => {
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        alert(this.errorMessage);
      },
      complete: () => {
      }
    }))
  }

  public changStyleHeart(event) {
    if (event.classList.contains('btnFavourite-selected')) {
      this.renderer.removeClass(event, 'btnFavourite-selected');
    } else {
      this.renderer.addClass(event, 'btnFavourite-selected');
    }
  }
}
