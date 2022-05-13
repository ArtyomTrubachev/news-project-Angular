import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./shared/main-layout/main-layout.component";
import {NewsComponent} from "./shared/news/news.component";
import {LoginComponent} from "./shared/login/login.component";
import {RegistrationComponent} from "./shared/registration/registration.component";
import {AuthGuard} from "./shared/services/auth.guard";
import {FavouriteNewsComponent} from "./shared/news/favourite-news/favourite-news.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'layout', component: MainLayoutComponent, children: [
      {path: 'news', component: NewsComponent, canActivate: [AuthGuard]},
      {path: 'favnews', component: FavouriteNewsComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
