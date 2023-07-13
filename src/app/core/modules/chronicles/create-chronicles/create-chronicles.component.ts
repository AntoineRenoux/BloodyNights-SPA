import { GameService } from '@shared/services/game.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Chronicle } from '@core/models/chronicle';
import { HelperService } from '@shared/services/helper.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Allegiance } from '@core/models/game/allegiance';
import { ChronicleService } from '@core/services/chronicle.service';
import { Clan } from '@core/models/game/clan';

@Component({
  selector: 'app-create-chronicles',
  templateUrl: './create-chronicles.component.html',
  styleUrls: ['./create-chronicles.component.scss'],
})
export class CreateChroniclesComponent implements OnInit {

  sects: Allegiance[];
  selectedSect: Allegiance;

  newChronicle = new Chronicle();
  newChronicleFormGroup: FormGroup;
  newChronicleLastTouchesFormGroup: FormGroup;

  displayedColumns: string[] = ['clan', 'setting'];
  rarities: string[] = ['COMMUN', 'UNCOMMUN', 'RARE', 'RESTRICTED', 'FORBIDDEN'];

  constructor(private gameService: GameService,
    private helpService: HelperService,
    private fb: FormBuilder,
    private chronicleService: ChronicleService,
    private route: Router,
    private trad: TranslateService,
    private toastr: ToastrService) {
      this.gameService.getSects().subscribe((sects: Allegiance[]) => {
        this.sects = sects;
      })
    }

  ngOnInit() {
    this.initForms();
    this.helpService.setHeaderTitle('CREATE_CRHONICLE_HELPER_HEADER');
    this.helpService.setTextHelp('CREATE_CRHONICLE_HELPER_TEXT');
  }

  initForms() {
    this.newChronicleFormGroup = this.fb.group({
      name: ['', Validators.required],
      localization: [{ value: '', disabled: false }],
      allegianceId: ['', Validators.required],
      theme: [{ value: '', disabled: false }],
      mood: [{ value: '', disabled: false }],
      description: [{ value: '', disabled: false }, Validators.required],
    }, { updateOn: "change" });

    this.newChronicleLastTouchesFormGroup = this.fb.group({
      initialPx: [30, [Validators.required, Validators.min(0), Validators.max(500)]],
      monthlyPx: [3, [Validators.required, Validators.min(0), Validators.max(500)]],
    }, { updateOn: "change" })
  }

  createChronicle() {
    if (this.newChronicleFormGroup.valid && this.newChronicleLastTouchesFormGroup.valid) {
      const chronicle: Chronicle = this.newChronicleFormGroup.getRawValue();
      chronicle.initialPx = this.newChronicleLastTouchesFormGroup.get('initialPx').value;
      chronicle.monthlyPx = this.newChronicleLastTouchesFormGroup.get('monthlyPx').value;
      chronicle.clans = this.selectedSect.clans;

      this.chronicleService.create(chronicle).subscribe(() => {
        this.trad.get('CREATE_CHRONOCLE_SUCCEED').subscribe(trad => {
          this.toastr.success(trad);
        });
        this.route.navigate(['/chronicle']);
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

  setNextStepper() {
    const selectedAllegianceId = this.newChronicleFormGroup.get('allegianceId').value;
    this.selectedSect = this.sects.find(x => x.key == selectedAllegianceId);
  }

  getAllBloodLines(): Array<Clan> {
      return this.selectedSect?.clans.map(clan => clan.bloodlines).filter(bloodlines => bloodlines && bloodlines.length > 0).reduce((acc, val) => acc.concat(val), []);
  }
}
