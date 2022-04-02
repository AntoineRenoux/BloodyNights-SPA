import { UserResetPassword } from '@core/models/userResetPassword';
import { UserLogin } from '@core/models/userLogin';
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

  resetPassword(model: UserResetPassword){
    return this.http.put(this.baseUrl + 'reset-password', model);
  }

  validEmail(email: string, token: string) {

    const model = {
      email: email,
      token: token
    }

    return this.http.post(this.baseUrl + 'email-validation', model)
  }

  sendEmailResetPassword(email: string) {
    return this.http.get(this.baseUrl + 'send-email-reset-password?' + 'email=' + email);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
