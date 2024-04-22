import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginState, Payload, State } from '../models/user.model/state.model';
import { RepoUsers } from './repo.service';
import { jwtDecode } from 'jwt-decode';

const initialState: State = {
  loginState: 'idle',
  token: null,
  currentPayload: null,
  currenUser: null,
};

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state$ = new BehaviorSubject<State>(initialState);
  private userId: string = '';

  constructor(private repoUsers: RepoUsers) {}
  getState(): Observable<State> {
    return this.state$.asObservable();
  }
  getToken = (): string | null => this.state$.value.token;
  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }

  setLogin(token: string) {
    const currentPayload = jwtDecode(token) as Payload;
    this.setCurrentUserId(currentPayload.id);
    localStorage.setItem('weekend7Challenge', JSON.stringify({ token }));
    this.repoUsers.getById(currentPayload.id).subscribe((user) => {
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token,
        currentPayload,
        currenUser: user,
      });
    });
  }

  setLogout() {
    localStorage.removeItem('week7.ng');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: null,
      currentPayload: null,
    });
  }
  getCurrentUserId(): string {
    return this.userId;
  }

  setCurrentUserId(userId: string): void {
    this.userId = userId;
  }
}
