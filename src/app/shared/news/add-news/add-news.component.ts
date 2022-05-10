import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {NewsService} from "../services/news.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.sass']
})
export class AddNewsComponent implements OnInit, OnDestroy {
  public userNewsForm: FormGroup;
  private subscription: Subscription;
  public errorMessage: string;


  constructor(
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    public dialogRef: MatDialogRef<AddNewsComponent>,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userNewsForm = this.formBuilder.group({
      "title": ['', [Validators.required]],
      "country": ['', [Validators.required]],
      "link": ['', [Validators.required]],
    })
  }

  public submit(): void {
    this.subscription = this.newsService.addNews(this.userNewsForm.value).subscribe({
      next: (data) => {
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        alert(this.errorMessage);
      },
      complete: () => {
        alert('Новость успешно добавлена');
        this.userNewsForm.reset();
      }
    })

  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
