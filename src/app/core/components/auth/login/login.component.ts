import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserLogin } from '@core/models/userLogin';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserResetPassword } from '@core/models/userResetPassword';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new UserLogin();
  resetUser = new UserResetPassword();
  modalRef?: BsModalRef;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private route: Router,
    private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ResetPassword() {
    this.authService.sendEmailResetPassword(this.resetUser.email).subscribe(() => {
      this.translate.get('RESET_PASSWORD_BODY_SEND').subscribe(trad => {
        this.toastr.success(trad);
        this.modalRef.hide();
      })
    }, (error) => {
      this.translate.get(error.error).subscribe(trad => {
        this.toastr.error(trad);
      })
    });
  }

  Login() {
    if (this.user.emailOrPseudo != null && this.user.password != null){
      this.authService.login(this.user).subscribe(() => {
        this.translate.get('SING_IN_SUCCED').subscribe(trad => {
          this.toastr.success(trad);
          this.route.navigate(["/"]);
        })
      }, (error) => {
        this.translate.get(error.error).subscribe(trad => {
          this.toastr.error(trad);
        });
      });
    }
  }

}
