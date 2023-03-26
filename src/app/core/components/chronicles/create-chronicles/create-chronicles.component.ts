import { Allegiance } from '@core/models/game/allegiance';
import { GameService } from '@shared/services/game.service';
import { ChronicleParameter } from '@core/models/game/chronicleParameters';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Chronicle } from '@core/models/chronicle';
import { HelperService } from '@shared/services/helper.service';
import { Clan } from '@core/models/game/clan';

@Component({
  selector: 'app-create-chronicles',
  templateUrl: './create-chronicles.component.html',
  styleUrls: ['./create-chronicles.component.scss'],
})
export class CreateChroniclesComponent implements OnInit {

  parameters: ChronicleParameter;
  allClans: Clan[];

  newChronicle = new Chronicle();
  stepOneFormGroup: FormGroup;

  displayedColumns: string[] = ['clan', 'setting'];

  constructor(private gameService: GameService,
    private helpService: HelperService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.parameters = new ChronicleParameter(this.gameService);
    this.initForms();
    this.helpService.setHeaderTitle('CREATE_CRHONICLE_HELPER_HEADER');
    this.helpService.setTextHelp('CREATE_CRHONICLE_HELPER_TEXT');
    this.gameService.getClans().subscribe((clans: Clan[]) => {
      this.allClans = clans;
    });
  }

  initForms() {
    this.stepOneFormGroup = this.fb.group({
      name: ['', Validators.required],
      allegiance: ['', Validators.required],
      localization: [{ value: '', disabled: false }],
      theme: [{ value: '', disabled: false }],
      ton: [{ value: '', disabled: false }],
      hook: [{ value: '', disabled: false }, Validators.required],
    }, { updateOn: "change" });
  }

  validFirstStep() {
    if (this.stepOneFormGroup.valid) {

      this.newChronicle.name = this.stepOneFormGroup.get('name').value;
      this.newChronicle.allegianceKey = this.stepOneFormGroup.get('allegiance').value;
      this.newChronicle.theme = this.stepOneFormGroup.get('theme').value;
      this.newChronicle.localization = this.stepOneFormGroup.get('localization').value;
      this.newChronicle.ton = this.stepOneFormGroup.get('ton').value;
      this.newChronicle.hook = this.stepOneFormGroup.get('hook').value;

      this.helpService.setHeaderTitle('CREATE_CRHONICLE_HELPER_HEADER');
      this.helpService.setTextHelp('CREATE_CRHONICLE_HELPER_HEADER_STEP_2');

      this.gameService.getSectByKey(this.newChronicle.allegianceKey).subscribe((allegiance: Allegiance) => {
        this.newChronicle.clans = allegiance.clans;
        console.log(this.newChronicle.clans);
      })
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
      case "ton":
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
}
