import { ChronicleService } from '@core/services/chronicle.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Chronicle } from '@core/models/chronicle';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Character } from '@core/models/game/character';
import { Archetype } from '@core/models/game/archetype';
import { Clan } from '@core/models/game/clan';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ArchetypeService } from '@shared/services/archetype.service';
import { CharacterService } from '@core/services/character.service';
import { ClanService } from '@shared/services/clan.service';
import { Focus } from '@core/models/game/focus';
import { FocusService } from '@shared/services/focus.service';
import { Skill } from '@core/models/game/skill';
import { SkillsService } from '@shared/services/skills.service';
import { HistoricService } from '@shared/services/historic.service';
import { Historic } from '@core/models/game/historic';
import { Discipline } from '@core/models/game/discipline';
import { AtoutFlaws } from '@core/models/game/atoutFlaws';
import { AtoutsFlawsService } from '@shared/services/atoutFlaws.service';
import { MatStepper } from '@angular/material/stepper';

function validAttributes(control: AbstractControl): ValidationErrors | null {
  const values = [3, 5, 7]; // Valid values

  // Check if all attributes are present and have valid values
  if (values.includes(control.get('physical')?.value) &&
    values.includes(control.get('mental')?.value) &&
    values.includes(control.get('social')?.value)) {

    // Check if all values are different
    if (new Set([control.get('physical')?.value, control.get('mental')?.value, control.get('social')?.value]).size === 3) {
      return null; // Return null if all conditions are met
    } else {
      return { differentValues: true }; // Return error object if values are not all different
    }
  } else {
    return { invalidAttributes: true }; // Return error object if conditions for valid values are not met
  }
}

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;

  currentCreationStep: number = 0;

  currentChronicle: Chronicle;

  archetypes: Archetype[];
  focus: Focus[];
  skills: Skill[] = [];
  historics: Historic[];

  allAtoutsFlaws: AtoutFlaws[];
  genericsAtouts: AtoutFlaws[];
  clansAtouts: AtoutFlaws[];
  allegianceAtouts: AtoutFlaws[];

  createCharacterStepOneForm: FormGroup;
  createCharacterStepTwoForm: FormGroup;
  createCharacterStepThreeForm: FormGroup;
  createCharacterStepFourForm: FormGroup;
  createChracterStepFiveForm: FormGroup;
  createCharacterStepSixForm: FormGroup;
  createCharacterStepSevenForm: FormGroup;

  selectedClan: Clan;

  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService,
    private archetypeService: ArchetypeService,
    private chronicleService: ChronicleService,
    private focusService: FocusService,
    private skillService: SkillsService,
    private historicService: HistoricService,
    private atoutFlawService: AtoutsFlawsService,
    public characterService: CharacterService,
    public clanService: ClanService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    this.route.params.subscribe(params => {
      this.chronicleService.getById(params['chronicleId']).subscribe({
        next: (c: Chronicle) => {
          this.currentChronicle = c;
          this.characterService.setCurrentExperience(c.initialXp);
        }
      });
    });

    this.atoutFlawService.get().subscribe({
      next: (af: AtoutFlaws[]) => {
        this.allAtoutsFlaws = af;
        this.genericsAtouts = af.filter(x => x.clanKey === null && x.allegianceKey === null && x.cost > 0);
        this.allegianceAtouts = af.filter(x => x.allegianceKey === this.currentChronicle.allegianceId && x.cost > 0);
      }
    });

    this.skillService.getSkills().subscribe({
      next: (s: Skill[]) => {
        this.skills = s;

        this.createCharacterStepFourForm = this.fb.group({
          skills: [this.fb.array([], Validators.required)]
        });

        this.initStepFour();
      }
    });

    this.archetypeService.getArchetypes().subscribe((archetypes: Archetype[]) => {
      this.archetypes = archetypes;
    });

    this.focusService.getFocus().subscribe({
      next: (focus: Focus[]) => {
        this.focus = focus;
      }
    });

    this.historicService.getHistorics().subscribe({
      next: (histo: Historic[]) => {
        this.historics = histo;
      }
    })
  }

  get gAtouts(): FormArray {
    return this.createCharacterStepSevenForm.get('genericAtouts') as FormArray;
  }

  get cAtouts(): FormArray {
    return this.createCharacterStepSevenForm.get('clanAtouts') as FormArray;
  }

  get aAtouts(): FormArray {
    return this.createCharacterStepSevenForm.get('alligenceAtouts') as FormArray;
  }

  get skillsArray(): FormArray {
    return this.createCharacterStepFourForm.get('skills') as FormArray;
  }

  ngOnInit() {
    this.initStepOne();
    this.initStepTwo();
    this.initStepThree();
    this.initStepFive();
    this.initStepSix();
    this.initStepSeven();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
      const newCharacter = this.createCharacterStepOneForm.getRawValue() as Character;
      this.characterService.setCharacter(newCharacter);
      this.currentCreationStep += 1;
    }
  }

  validationStepTwo() {
    if (this.createCharacterStepTwoForm.valid) {
      this.characterService.setClan(this.selectedClan);

      if (this.selectedClan.rarity?.cost) {
        const rarityClanAtout = this.clansAtouts?.find(x => x.clanKey.includes(this.selectedClan.key));

        const atout = this.fb.group({
          atouts: [rarityClanAtout],
        });

        this.cAtouts.push(atout);
      }

      if (this.selectedClan.parentId !== null) {
        this.clansAtouts = this.allAtoutsFlaws.filter(x => x.clanKey === this.selectedClan.parentId && x.cost > 0);

        if (this.selectedClan.rarity?.cost > 0) {

          const rarityClanAtout = this.clansAtouts.find(x => x.name.includes(this.selectedClan.key));

          const atout = this.fb.group({
            atouts: [rarityClanAtout],
          });

          this.cAtouts.push(atout);
        }
      }
      else {
        this.clansAtouts = this.allAtoutsFlaws.filter(x => x.clanKey === this.selectedClan.key && x.cost > 0);
      }

      this.characterService.setDiscplines(undefined);
      this.createCharacterStepSixForm.reset();
      this.currentCreationStep += 1;
    }
  }

  validationStepThree() {
    if (this.createCharacterStepThreeForm.valid) {
      this.characterService.setAttributs(
        this.createCharacterStepThreeForm.get('physical').value,
        this.createCharacterStepThreeForm.get('social').value,
        this.createCharacterStepThreeForm.get('mental').value);

      let focus = new Array<Focus>();
      focus.push(this.createCharacterStepThreeForm.get('physicalFocus').value);
      focus.push(this.createCharacterStepThreeForm.get('mentalFocus').value);
      focus.push(this.createCharacterStepThreeForm.get('socialFocus').value);

      this.characterService.setFocus(focus);
      this.currentCreationStep += 1;
    }
  }

  validationStepFour() {
    if (this.verifSkills()) {
      let skills = this.skills.filter(x => x.level > 0).sort((a, b) => {
        return b.level - a.level
      });

      this.createCharacterStepFourForm.get('skills').setValue(skills);

      this.characterService.setSkills(skills);
      this.currentCreationStep += 1;

      this.stepper.next();
    }
  }

  validationStepFive() {
    if (this.verifHistorics()) {
      let histo = this.historics.filter(h => h.level).sort((a, b) => {
        return b.level - a.level;
      });

      this.createChracterStepFiveForm.get('historicAtThree').setValue(histo.find(h => h.level === 3));
      this.createChracterStepFiveForm.get('historicAtTwo').setValue(histo.find(h => h.level === 2));
      this.createChracterStepFiveForm.get('historicAtOne').setValue(histo.find(h => h.level === 1));

      this.characterService.setHistorics(histo);
      this.currentCreationStep += 1;

      this.stepper.next();
    }
  }

  validationStepSix() {
    if (this.verifDisciplines()) {
      let disciplines = this.selectedClan?.disciplines.filter(d => d.level > 0).sort((a, b) => {
        return b.level - a.level;
      });

      this.createCharacterStepSixForm.get('disciplines').setValue(disciplines);

      this.characterService.setDiscplines(disciplines);
      this.currentCreationStep += 1;
      this.stepper.next();
    }
  }

  rating(stuff: Skill | Historic | Discipline, rating: number) {
    if (stuff.level === 1 && rating === 1) {
      stuff.level = 0;
    }
    else {
      stuff.level = rating;
    }
  }

  ratingAttributes(attribute: string, level: number) {
    switch(attribute) {
      case 'physical':
        this.createCharacterStepThreeForm.get('physical').setValue(level);
        break;
      case 'social':
        this.createCharacterStepThreeForm.get('social').setValue(level);
        break;
      case 'mental':
        this.createCharacterStepThreeForm.get('mental').setValue(level);
        break;
    }
  }

  addGenericAtout() {
    const atout = this.fb.group({
      atouts: [null],
    });

    this.gAtouts.push(atout);
  }

  addClanAtout() {
    const atout = this.fb.group({
      atouts: [null],
    });

    this.cAtouts.push(atout);
  }

  addAlligianceAtout() {
    const atout = this.fb.group({
      atouts: [null],
    });

    this.aAtouts.push(atout);
  }

  removeGenericAtout(index: number) {
    this.gAtouts.removeAt(index);
  }

  removeClanAtout(index: number) {
    this.cAtouts.removeAt(index);
  }

  removeAlliganceAtout(index: number) {
    this.aAtouts.removeAt(index);
  }

  verifSkills(): boolean {
    const currentSkills = this.skills.filter(s => s.level > 0);

    if (currentSkills.filter(x => x.level === 5).length != 0)
      return false;

    if (currentSkills.filter(x => x.level === 4).length != 1)
      return false;

    if (currentSkills.filter(x => x.level === 3).length != 2)
      return false;

    if (currentSkills.filter(x => x.level === 2).length != 3)
      return false;

    if (currentSkills.filter(x => x.level === 1).length != 4)
      return false;

    return true;
  }

  verifHistorics(): boolean {
    const currentHistorics = this.historics.filter(s => s.level > 0);

    if (currentHistorics.filter(x => x.level === 5).length != 0)
      return false;

    if (currentHistorics.filter(x => x.level === 4).length != 0)
      return false;

    if (currentHistorics.filter(x => x.level === 3).length != 1)
      return false;

    if (currentHistorics.filter(x => x.level === 2).length != 1)
      return false;

    if (currentHistorics.filter(x => x.level === 1).length != 1)
      return false;

    return true;
  }

  verifDisciplines() : boolean {
    return this.selectedClan?.disciplines.filter(x => x.level === 2).length === 1 && 
      this.selectedClan?.disciplines.filter(x => x.level === 1).length === 2;
  }

  private initStepOne() {
    this.createCharacterStepOneForm = this.fb.group({
      concept: [null, Validators.required],
      archetype: [null, Validators.required],
    });
  }

  private initStepTwo() {
    this.createCharacterStepTwoForm = this.fb.group({
      clan: [null, Validators.required]
    });
  }

  private initStepThree() {
    this.createCharacterStepThreeForm = this.fb.group({
      physical: [null, Validators.required],
      physicalFocus: [null, Validators.required],
      mental: [null, Validators.required],
      mentalFocus: [null, Validators.required],
      social: [null, Validators.required],
      socialFocus: [null, Validators.required],
    }, { validator: validAttributes });
  }

  private initStepFour() {
    this.createCharacterStepFourForm = this.fb.group({
      skills: [this.fb.array([]), Validators.required]
    });
  }

  private initStepFive() {
    this.createChracterStepFiveForm = this.fb.group({
      historicAtThree: [null, Validators.required],
      historicAtTwo: [null, Validators.required],
      historicAtOne: [null, Validators.required]
    });
  }

  private initStepSix() {
    this.createCharacterStepSixForm = this.fb.group({
      disciplines: [this.fb.array([]), Validators.required],
    });
  }

  private initStepSeven() {
    this.createCharacterStepSevenForm = this.fb.group({
      genericAtouts: this.fb.array([]),
      clanAtouts: this.fb.array([]),
      alligenceAtouts: this.fb.array([]),
      flaws: this.fb.array([])
    });
  }
}
