import { UserLogin } from './../models/userLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '@core/models/userRegister';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { User } from '@core/models/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  register(registerModel: UserRegister) {
    return this.http.post(this.baseUrl + 'register', registerModel);
  }

  login(loginModel: UserLogin) {
    return this.http.post(this.baseUrl + 'login', loginModel).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
