import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from '@shared/services/validator.service';
import { UserService } from '@shared/services/user.service';

import { AuthService } from '@core/services/auth.service';
import { User } from '@core/models/user';
import { UserChangePassword } from '@core/models/userChangePassword';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  editForm: FormGroup;
  editPassword: FormGroup;
  user: User;
  userChangePassword: UserChangePassword;

  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  fieldSelected: string = 'GENERAL_INFORMATIONS';

  constructor(private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private toaster: ToastrService,
    private trad: TranslateService,
    private route: Router) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((u: User) => {
      this.user = u;
    })
    this.initializeGeneralSettings();
    this.initializeEditPassword();
  }

  initializeGeneralSettings() {
    this.editForm = this.fb.group({
      firstname: [this.user.firstName, [Validators.required, Validators.pattern(this.validatorService.firstNameRegex)]],
      lastname: [this.user.lastName, [Validators.required, Validators.pattern(this.validatorService.lastNameRegex)]],
      pseudo: [this.user.pseudo, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email, Validators.pattern(this.validatorService.emailRegex)]],
      phoneNumber: [this.user.phoneNumber, [Validators.required]],
      address: [this.user.address],
      city: [this.user.city],
      zipcode: [this.user.zipCode],
      country: [this.user.country],
    }, { updateOn: "change" });
  }

  initializeEditPassword() {
    this.editPassword = this.fb.group({
      currentPassword: [null, [Validators.required, Validators.minLength(8)]],
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, this.validatorService.matchValues('newPassword')]]
    });
  }

  changeSettings() {
    if (this.editForm.valid) {
      this.user.firstName = this.editForm.get('firstname').value;
      this.user.lastName = this.editForm.get('lastname').value;
      this.user.pseudo = this.editForm.get('pseudo').value;
      this.user.email = this.editForm.get('email').value;
      this.user.phoneNumber = this.editForm.get('phoneNumber').value;
      this.user.address = this.editForm.get('address').value;
      this.user.city = this.editForm.get('city').value;
      this.user.zipCode = this.editForm.get('zipcode').value;
      this.user.country = this.editForm.get('country').value;

      this.userService.editSettings(this.user).subscribe(() => {
        this.authService.setCurrentUser(this.user);
        this.trad.get('SAVED').subscribe((trad: string) => {
          this.toaster.success(trad);
        });
        this.route.navigate(['/']);
      }, () => {
        this.trad.get('SAVE_FAILED').subscribe((trad: string) => {
          this.toaster.error(trad);
        })
      });
    }
  }

  changePassword() {
    if (this.editPassword.valid) {
      this.userChangePassword.currentPassword = this.editForm.get('currentPassword').value;
      this.userChangePassword.newPassword = this.editForm.get('newPassword').value;
      this.userChangePassword.confirmPassword = this.editForm.get('confirmPassword').value;

      this.authService.changePassword(this.userChangePassword).subscribe(() => {
        this.trad.get('SAVED').subscribe((trad: string) => {
          this.toaster.success(trad);
        });
      }, () => {
        this.trad.get('SAVE_FAILED').subscribe((trad: string) => {
          this.toaster.error(trad);
        })
      });
    }
  }

  returnHome() {
    this.route.navigate(['/']);
  }
}
