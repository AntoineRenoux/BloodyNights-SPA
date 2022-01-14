import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bloodynights-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.route.navigate(["/"]);
  }
}
