import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {NewsService} from "../services/news.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.sass']
})
export class EditNewsComponent implements OnInit {
  public userNewsForm: FormGroup;
  private subscription: Subscription;
  public errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    public dialogRef: MatDialogRef<EditNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userNewsForm = this.formBuilder.group({
    "title": [this.data.title, [Validators.required]],
    "country": [this.data.country, [Validators.required]],
    "link": [this.data.link, [Validators.required]],
  })
  }

  public submit(): void {
    let editNews = {
      title: this.userNewsForm.value.title,
      country: this.userNewsForm.value.country,
      link: this.userNewsForm.value.link,
      id: this.data.id
    }

    console.log(editNews);
   this.subscription = this.newsService.editNews(editNews).subscribe({
    next: (data) => {
    },
    error: (error) => {
      this.errorMessage = error.error.message;
      alert(this.errorMessage);
    },
    complete: () => {
      alert('Новость успешно отредактирована');
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
