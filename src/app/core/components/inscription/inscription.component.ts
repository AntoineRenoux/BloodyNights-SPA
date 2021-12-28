import { TranslateService } from '@ngx-translate/core';
import { UserRegister } from '@core/models/userRegister';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '@shared/services/validator.service';
import { AuthService } from '@core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  initializeRegisterForm() {
    this.registerForm = this.fb.group({
      firstname: [null, [Validators.required, Validators.pattern(this.validatorService.firstNameRegex)]],
      lastname: [null, [Validators.required, Validators.pattern(this.validatorService.lastNameRegex)]],
      alias: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, Validators.pattern(this.validatorService.emailRegex)]],
      birthdate: new FormControl(null, [Validators.required, this.validatorService.validAge()]),
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmedPassword: [null, [Validators.required, this.validatorService.matchValues('password')]]
    }, { updateOn: 'change' });
  }

  register() {
    if (this.registerForm.valid) {
      var userRegister = new UserRegister();
      userRegister.firstName = this.registerForm.get('firstname').value;
      userRegister.lastName = this.registerForm.get('lastname').value;
      userRegister.pseudo = this.registerForm.get('alias').value;
      userRegister.email = this.registerForm.get('email').value;
      userRegister.birthDate = this.registerForm.get('birthdate').value;
      userRegister.password = this.registerForm.get('password').value;
      userRegister.confirmedPassword = this.registerForm.get('confirmedPassword').value;

      this.authService.register(userRegister).subscribe(() => {
        this.translate.get("ACCOUNT_CREATION_SUCCESSED").subscribe(trad => {
          this.toastr.success(trad);
        });

      }, (error) => {
        this.translate.get(error.error).subscribe(trad => {
          this.toastr.error(trad);
        })
      });

    }
  }
}
