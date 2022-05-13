import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './shared/news/news.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import { LoginComponent } from './shared/login/login.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import { AddNewsComponent } from './shared/news/add-news/add-news.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { FavouriteNewsComponent } from './shared/news/favourite-news/favourite-news.component';
import { EditNewsComponent } from './shared/news/edit-news/edit-news.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    MainLayoutComponent,
    LoginComponent,
    RegistrationComponent,
    AddNewsComponent,
    FavouriteNewsComponent,
    EditNewsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCardModule,
        MatButtonToggleModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
