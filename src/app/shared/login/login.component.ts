import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public userForm: FormGroup;
  public errorMessage: string ='';
  public lsValueEmail: string ='ddd';
  private subscription: Subscription;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.lsValueEmail = localStorage.getItem('email');

    this.userForm = this.formBuilder.group({
      "email": [`${ !!this.lsValueEmail ? this.lsValueEmail: ""}`, [Validators.required, Validators.email]],
      "password": ["", [Validators.required]],
    })
  }

  signIn() {
    this.subscription = this.authService.login(this.userForm.value).subscribe({
      next: (data) => {
      },
      error: (error) => {
        this.errorMessage = error.error;
      },
      complete: () => {
        localStorage.setItem('email', this.userForm.value.email);
        this.router.navigate(['/layout/news']);
      }
    })
  }
}
