import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserLogin } from '@core/models/userLogin';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new UserLogin();

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService) { }

  ngOnInit() {
  }

  Login() {
    if (this.user.emailOrPseudo != null && this.user.password != null){
      this.authService.login(this.user).subscribe(() => {
        this.translate.get('SING_IN_SUCCED').subscribe(trad => {
          this.toastr.success(trad);
        })
      }, (error) => {
        this.translate.get(error.error).subscribe(trad => {
          this.toastr.error(trad);
        });
      });
    }
  }

}
