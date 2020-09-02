import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe(response => {
        const token = btoa(this.loginForm.value.login.concat(':').concat(this.loginForm.value.password));
        sessionStorage.setItem('token', token);
        this.router.navigate(['calories']);
      }, error => {
        this.errorMessage = 'Nieprawidłowy login lub hasło';
      });
    }
  }

}
