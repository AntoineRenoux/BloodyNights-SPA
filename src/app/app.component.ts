import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@core/models/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService,
    private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
    this.translateService.setDefaultLang('fr');
    this.translateService.use('fr').subscribe();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('bn_user'));
    if (user != null) {
      this.authService.setCurrentUser(user);
    }
  }
}
