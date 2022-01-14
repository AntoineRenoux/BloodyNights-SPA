import { ValidatorService } from '@shared/services/validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResetPassword } from '@core/models/userResetPassword';

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  model = new UserResetPassword();
  resetPasswordForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private trad: TranslateService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private validatorService: ValidatorService) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.model.email = params['email'];
      this.model.token = params['token'];
    })

    this.InitializeForm();
  }

  InitializeForm(){
    this.resetPasswordForm = this.fb.group({
      newPassword: [null, [Validators.required]],
      confirmPassword:[null, [Validators.required, this.validatorService.matchValues('newPassword')]]
    }, { updateOn: 'change' });
  }

  ResetPassword(){
    this.model.newPassword = this.resetPasswordForm.get('newPassword').value;
    this.model.confirmPassword = this.resetPasswordForm.get('confirmPassword').value;

    this.authService.resetPassword(this.model).subscribe(() => {
      this.trad.get('CHANGE_PASSWORD_SUCCESSED').subscribe((trad) => {
        this.toastr.success(trad);
      });
    })
  }

}
