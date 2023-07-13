import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('bn_user'));
    if (user != null) {
      this.authService.setCurrentUser(user);
    }
  }
}
