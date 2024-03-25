import { ChronicleService } from '@core/services/chronicle.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Chronicle } from '@core/models/chronicle';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Character } from '@core/models/game/character';
import { Archetype } from '@core/models/game/archetype';
import { Clan } from '@core/models/game/clan';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ArchetypeService } from '@shared/services/archetype.service';
import { CharacterService } from '@core/services/character.service';
import { ClanService } from '@shared/services/clan.service';
import { Focus } from '@core/models/game/focus';
import { FocusService } from '@shared/services/focus.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {

  currentChronicle: Chronicle;

  archetypes: Archetype[];
  focus: Focus[];

  createCharacterStepOneForm: FormGroup;
  createCharacterStepTwoForm: FormGroup;
  createCharacterStepThreeForm: FormGroup;

  selectedClan: Clan;

  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService,
    private archetypeService: ArchetypeService,
    private chronicleService: ChronicleService,
    private focusService: FocusService,
    public characterService: CharacterService,
    public clanService: ClanService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    this.route.params.subscribe(params => {
      this.chronicleService.getById(params['chronicleId']).subscribe((c: Chronicle) => {
        this.currentChronicle = c;
        this.characterService.setCurrentExperience(c.initialXp);
        console.log(c);
      });
    });

    this.archetypeService.getArchetypes().subscribe((archetypes: Archetype[]) => {
      this.archetypes = archetypes;
    });

    this.focusService.getFocus().subscribe({
      next: (focus: Focus[]) => {
        this.focus = focus;
        console.log(this.focus);
      }
    })
  }

  ngOnInit() {
    this.initCreateCharacterForms();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  initCreateCharacterForms() {
    this.createCharacterStepOneForm = this.fb.group({
      concept: ['PENIS', Validators.required],
      archetype: ['BRUTE_NAME', Validators.required],
    });

    this.createCharacterStepTwoForm = this.fb.group({
      clan: ['AHRIMANE', Validators.required]
    });

    this.createCharacterStepThreeForm = this.fb.group({
      physical: [null, Validators.required],
      mental: [null, Validators.required],
      social: [null, Validators.required]
    });
  }

  selectClan(modal: any) {
    this.createCharacterStepTwoForm.get('clan').setValue(this.selectedClan);
    modal.hide();
  }

  backToMainClan(clanId: string) {
    this.selectedClan = this.currentChronicle.clans.find(c => c.key == clanId);
  }

  validationStepOne() {
    if (this.createCharacterStepOneForm.valid) {
      var newCharacter = this.createCharacterStepOneForm.getRawValue() as Character;
      this.characterService.setCharacter(newCharacter);
    }
  }

  validationStepTwo() {
    if (this.createCharacterStepTwoForm.valid) {
      this.characterService.setClan(this.selectedClan);
    }
  }
}
