import { Component } from '@angular/core';
import { RepoUsers } from '../../core/repo.service';
import { StateService } from '../../core/state.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLoginDto } from '../../models/user.model/user.model';

@Component({
  selector: 'defaultprefixname-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: ` <form [formGroup]="formLogin" (ngSubmit)="submit()">
    <label for="username">Username</label>
    <input id="username" type="text" formControlName="username" />
    <label for="password">Password</label>
    <input id="password" type="password" formControlName="password" />
    <button type="submit" [disabled]="formLogin.invalid">Submit</button>
  </form>`,
  styles: ``,
})
export class LoginComponent {
  constructor(
    private repo: RepoUsers,
    private state: StateService,
    private forms: FormBuilder
  ) {}
  formLogin = this.forms.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  submit() {
    this.repo.login(this.formLogin.value as UserLoginDto).subscribe({
      next: ({ token }) => {
        this.state.setLogin(token);
        console.log('Logged in', token);
      },
      error: (err) => {
        console.error(err);
        this.state.setLoginState('error');
      },
    });
  }
}
