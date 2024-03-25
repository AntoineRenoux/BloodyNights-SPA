import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Chronicle } from '@core/models/chronicle';
import { HelperService } from '@shared/services/helper.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Allegiance } from '@core/models/game/allegiance';
import { ChronicleService } from '@core/services/chronicle.service';
import { AllegianceService } from '@shared/services/allegiance.service';
import { ClanService } from '@shared/services/clan.service';

@Component({
  selector: 'app-create-chronicles',
  templateUrl: './create-chronicles.component.html',
  styleUrls: ['./create-chronicles.component.scss'],
})
export class CreateChroniclesComponent implements OnInit {

  sects: Allegiance[];

  newChronicle = new Chronicle();
  newChronicleInformationsFormGroup: FormGroup;
  newChronicleClansFormGroup: FormGroup;
  newChronicleLastTouchesFormGroup: FormGroup;

  rarities: string[] = ['COMMUN', 'UNCOMMUN', 'RARE', 'RESTRICTED', 'FORBIDDEN'];

  constructor(private fb: FormBuilder,
    private route: Router,
    private trad: TranslateService,
    private toastr: ToastrService,
    private helpService: HelperService,
    private chronicleService: ChronicleService,
    private allegianceService: AllegianceService,
    public clanService: ClanService) {
    this.allegianceService.getSects().subscribe((sects: Allegiance[]) => {
      this.sects = sects;
    });
  }

  ngOnInit() {
    this.initForms();
    this.helpService.setHeaderTitle('CREATE_CRHONICLE_HELPER_HEADER');
    this.helpService.setTextHelp('CREATE_CRHONICLE_HELPER_TEXT');
  }

  initForms() {
    this.newChronicleInformationsFormGroup = this.fb.group({
      name: [this.newChronicle.name, Validators.required],
      localization: [{ value: this.newChronicle.localization, disabled: false }],
      allegianceId: [this.newChronicle.allegianceId, Validators.required],
      theme: [{ value: this.newChronicle.theme, disabled: false }],
      mood: [{ value: this.newChronicle.mood, disabled: false }],
      hook: [{ value: this.newChronicle.hook, disabled: false }, Validators.required],
    }, { updateOn: "change" });

    this.newChronicleClansFormGroup = this.fb.group({
      clans: [this.newChronicle.clans, Validators.required]
    });

    this.newChronicleLastTouchesFormGroup = this.fb.group({
      initialXp: [30, [Validators.required, Validators.min(0), Validators.max(500)]],
      monthlyXp: [3, [Validators.required, Validators.min(0), Validators.max(500)]],
    }, { updateOn: "change" })
  }

  createChronicle() {
    if (this.newChronicleInformationsFormGroup.valid && this.newChronicleLastTouchesFormGroup.valid) {

      this.newChronicle.initialXp = this.newChronicleLastTouchesFormGroup.get('initialXp').value;
      this.newChronicle.monthlyXp = this.newChronicleLastTouchesFormGroup.get('monthlyXp').value;

      this.chronicleService.create(this.newChronicle).subscribe({
        next: () => {
          this.toastr.success(this.trad.instant('CREATE_CHRONOCLE_SUCCEED'));
          this.route.navigate(['/chronicle']);
        },
        error: () => {
          this.toastr.error(this.trad.instant('GENERIC_ERROR'));
        }
      });
    }
  }

  displayHelper(field: string) {
    switch (field) {
      case "name":
        this.helpService.setHeaderTitle('CREATE_CRHONICLE_NAME_DESCRIPTION');
        this.helpService.setTextHelp('CREATE_CRHONICLE_NAME_EXEMPLE_TITLE');
        break;
      case "theme":
        this.helpService.setHeaderTitle('CREATE_CRHONICLE_HELPER_HEADER_THEME');
        this.helpService.setTextHelp('CREATE_CRHONICLE_THEME_DESCRIPTION_EXEMPLES');
        break;
      case "mood":
        this.helpService.setHeaderTitle('CREATE_CRHONICLE_HELPER_HEADER_TON');
        this.helpService.setTextHelp('CREATE_CRHONICLE_TON_DESCRIPTION_EXEMPLE');
        break;
      case 'allegiance':
        this.helpService.setHeaderTitle('CREATE_CRHONICLE_SECT');
        this.helpService.setTextHelp('CREATE_CRHONICLE_CHOOSING_SECT');
        break;
      case 'localization':
        this.helpService.setHeaderTitle('CREATE_CRHONICLE_LOCALIZATION');
        this.helpService.setTextHelp('CREATE_CRHONICLE_LOCALIZATION_DESCRIPTION');
        break;
      case 'hook':
        this.helpService.setHeaderTitle('CREATE_CRHONICLE_HOOK');
        this.helpService.setTextHelp('CREATE_CRHONICLE_HOOK_DESCRIPTION');
        break;
    }
  }

  changeStepper(index: number) {
    switch (index) {
      case 1:
        this.newChronicle.clans = this.sects.find(s => s.key == this.newChronicle.allegianceId).clans;
        break;
      case 2:
        console.log(this.newChronicle);
        break;
    }
  }
}
