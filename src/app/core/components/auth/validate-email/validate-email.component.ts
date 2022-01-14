import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent implements OnInit {

  email: string;
  token: string;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.validEmail();
  }

  validEmail(){
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];

      this.authService.validEmail(this.email, this.token).subscribe(() => {
        setTimeout(() => {
          this.router.navigate(['/auth/connexion']);
      }, 3000);
      });
    });
  }
}
