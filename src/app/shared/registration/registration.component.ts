import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public userForm: FormGroup;
  public errorMessage: string ='';
  private subscription: Subscription;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      "name": ["", [Validators.required]],
      "secondName": ["", [Validators.required]],
      "email": ["", [Validators.required, Validators.email]],
      "password": ["", [Validators.required]],
    })
  }

  public submit(): void {
    this.subscription = this.authService.registration(this.userForm.value).subscribe({
      next: (data) => {
      },
      error: (error) => {
        this.errorMessage = error.error;
      },
      complete: () => {
        this.router.navigate(['/login']);
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
