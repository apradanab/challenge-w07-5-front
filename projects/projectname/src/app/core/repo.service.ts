import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserLoginDto, UserRegisterDto } from '../models/user.model/user.model';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepoUsers {
  httpClient = inject(HttpClient);
  url = environment.apiUrl + '/users';

  getAllUsers(): Observable<unknown[]> {
    return this.httpClient.get<unknown[]>(this.url);
  }

  login(_data: UserLoginDto) {
    const data = {
      name: _data.username,
      password: _data.password,
    };
    return this.httpClient.post<{ token: string }>(this.url + '/login', data);
  }

  getById(id: string) {
    return this.httpClient.get(this.url + '/' + id);
  }
  register(_data: UserRegisterDto) {
    const data = {
      name: _data.name,
      email: _data.email,
      password: _data.password,
    };
    return this.httpClient.post(this.url + '/register', data);
  }
}
