import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@core/models/user';

@Component({
  selector: 'bloodynights-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser$: Observable<User>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
  }
}
