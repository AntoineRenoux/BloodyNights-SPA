import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/models/user';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl + 'user/';

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<User>{
    return this.http.get<User>(this.baseUrl + 'get-by-id/' + id);
  }

  editSettings(user: User){
    return this.http.put(this.baseUrl, user);
  }

}
