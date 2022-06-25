import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Chronicle } from '@core/models/chronicle';
import { HelperService } from '@shared/services/helper.service';

@Component({
  selector: 'app-create-chronicles',
  templateUrl: './create-chronicles.component.html',
  styleUrls: ['./create-chronicles.component.scss'],
})
export class CreateChroniclesComponent implements OnInit {

  newChronicle = new Chronicle();
  stepOneFormGroup: FormGroup;

  constructor(private helpService: HelperService,
    private fb: FormBuilder) {  }

  ngOnInit() {
    this.initForms();
    this.helpService.setHeaderTitle('CREATE_CRHONICLE_NAME_EXEMPLE_TITLE');
    this.helpService.setTextHelp('CREATE_CRHONICLE_NAME_EXEMPLE');
  }

  initForms() {
    this.stepOneFormGroup = this.fb.group({
      name: ['', Validators.required],
      theme: [''],
      ton: [''],
      hook: ['', Validators.required],
    });
  }

  validFirstStep() {
    if (this.stepOneFormGroup.valid) {
      this.newChronicle.name = this.stepOneFormGroup.get('name').value;
      this.newChronicle.theme = this.stepOneFormGroup.get('theme').value;
      this.newChronicle.theme = this.stepOneFormGroup.get('ton').value;
      this.newChronicle.hook = this.stepOneFormGroup.get('hook').value;
    }
  }

}
