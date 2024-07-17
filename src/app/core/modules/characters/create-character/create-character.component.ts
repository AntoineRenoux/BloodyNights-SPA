import { ChronicleService } from '@core/services/chronicle.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
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

const uniqueValuesValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  const formGroup = control as FormGroup;
  const values = Object.values(formGroup.value);

  const duplicateValues = values.filter((value, index) => values.indexOf(value) !== index);

  return duplicateValues.length > 0 ? { 'nonUniqueValues': true } : null;
};

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {

  attributsInitialValues = [7, 5, 3]

  currentChronicle: Chronicle;

  archetypes: Archetype[];
  focus: Focus[];
  skills: Skill[];
  historics: Historic[];

  allAtoutsFlaws: AtoutFlaws[];
  genericsAtouts: AtoutFlaws[];
  clansAtouts : AtoutFlaws[];
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
      this.chronicleService.getById(params['chronicleId']).subscribe((c: Chronicle) => {
        this.currentChronicle = c;
        this.characterService.setCurrentExperience(c.initialXp);
      });
    });

    this.archetypeService.getArchetypes().subscribe((archetypes: Archetype[]) => {
      this.archetypes = archetypes;
    });

    this.focusService.getFocus().subscribe({
      next: (focus: Focus[]) => {
        this.focus = focus;
      }
    });

    this.skillService.getSkills().subscribe({
      next: (skills: Skill[]) => {
        this.skills = skills;
      }
    })

    this.historicService.getHistorics().subscribe({
      next: (histo: Historic[]) => {
        this.historics = histo;
      }
    })

    this.atoutFlawService.get().subscribe({
      next: (af: AtoutFlaws[]) => {
        this.allAtoutsFlaws = af;
        this.genericsAtouts = af.filter(x => x.clanKey === null && x.allegianceKey === null && x.cost > 0);
        this.allegianceAtouts = af.filter(x => x.allegianceKey === this.currentChronicle.allegianceId && x.cost > 0);
      }
    })

    this.characterService.getCharacter().subscribe({
      next: (c: Character) => {
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

  ngOnInit() {
    this.initCreateCharacterForms();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  initCreateCharacterForms() {
    this.createCharacterStepOneForm = this.fb.group({
      concept: [null, Validators.required],
      archetype: [null, Validators.required],
    });

    this.createCharacterStepTwoForm = this.fb.group({
      clan: [null, Validators.required]
    });

    this.createCharacterStepThreeForm = this.fb.group({
      physical: [null, Validators.required],
      physicalFocus: [null, Validators.required],
      mental: [null, Validators.required],
      mentalFocus: [null, Validators.required],
      social: [null, Validators.required],
      socialFocus: [null, Validators.required],
    }, { validator: validAttributes });

    this.createCharacterStepFourForm = this.fb.group({
      fourPointsSkill: [null, Validators.required],

      threePointsSkillsOne: [null, Validators.required],
      threePointsSkillsTwo: [null, Validators.required],

      twoPointsSkillsOne: [null, Validators.required],
      twoPointsSkillsTwo: [null, Validators.required],
      twoPointsSkillsThree: [null, Validators.required],

      onePointSkillsOne: [null, Validators.required],
      onePointSkillsTwo: [null, Validators.required],
      onePointSkillsThree: [null, Validators.required],
      onePointSkillsFour: [null, Validators.required],
    }, { validator: uniqueValuesValidator });

    this.createChracterStepFiveForm = this.fb.group({
      historicAtThree: [null, Validators.required],
      historicAtTwo: [null, Validators.required],
      historicAtOne: [null, Validators.required]
    }, { validator: uniqueValuesValidator });

    this.createCharacterStepSixForm = this.fb.group({
      disciplineAtTwo: [null, Validators.required],
      disciplineAtOneA: [null, Validators.required],
      disciplineAtOneB: [null, Validators.required],
    }, { validator: uniqueValuesValidator });

    this.createCharacterStepSevenForm = this.fb.group({
      genericAtouts: this.fb.array([]),
      clanAtouts: this.fb.array([]),
      alligenceAtouts: this.fb.array([]),
      flaws: this.fb.array([])
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
      const newCharacter = this.createCharacterStepOneForm.getRawValue() as Character;
      this.characterService.setCharacter(newCharacter);
    }
  }

  validationStepTwo() {
    if (this.createCharacterStepTwoForm.valid) {
      this.characterService.setClan(this.selectedClan);

      if (this.selectedClan.rarity.cost) {
        const rarityClanAtout = this.clansAtouts.find(x => x.name.includes(this.selectedClan.key));

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
    }
  }

  validationStepFour() {
    if (this.createCharacterStepFourForm.valid) {
      let skills = new Array<Skill>();

      let skillAtFour = this.createCharacterStepFourForm.get('fourPointsSkill').value as Skill;
      skillAtFour.level = 4;
      skills.push(skillAtFour);

      let skillsAtThreeOne = this.createCharacterStepFourForm.get('threePointsSkillsOne').value as Skill;
      skillsAtThreeOne.level = 3;
      skills.push(skillsAtThreeOne);

      let threePointsSkillsTwo = this.createCharacterStepFourForm.get('threePointsSkillsTwo').value as Skill;
      threePointsSkillsTwo.level = 3;
      skills.push(threePointsSkillsTwo);

      let twoPointsSkillsOne = this.createCharacterStepFourForm.get('twoPointsSkillsOne').value as Skill;
      twoPointsSkillsOne.level = 2;
      skills.push(twoPointsSkillsOne);

      let twoPointsSkillsTwo = this.createCharacterStepFourForm.get('twoPointsSkillsTwo').value as Skill;
      twoPointsSkillsTwo.level = 2;
      skills.push(twoPointsSkillsTwo);

      let twoPointsSkillsThree = this.createCharacterStepFourForm.get('twoPointsSkillsThree').value as Skill;
      twoPointsSkillsThree.level = 2;
      skills.push(twoPointsSkillsThree);

      let onePointSkillsOne = this.createCharacterStepFourForm.get('onePointSkillsOne').value as Skill;
      onePointSkillsOne.level = 1;
      skills.push(onePointSkillsOne);

      let onePointSkillsTwo = this.createCharacterStepFourForm.get('onePointSkillsTwo').value as Skill;
      onePointSkillsTwo.level = 1;
      skills.push(onePointSkillsTwo);

      let onePointSkillsThree = this.createCharacterStepFourForm.get('onePointSkillsThree').value as Skill;
      onePointSkillsThree.level = 1;
      skills.push(onePointSkillsThree);

      let onePointSkillsFour = this.createCharacterStepFourForm.get('onePointSkillsFour').value as Skill;
      onePointSkillsFour.level = 1;
      skills.push(onePointSkillsFour);

      this.characterService.setSkills(skills);
    }
  }

  validationStepFive() {
    if (this.createChracterStepFiveForm.valid) {
      let histo = new Array<Historic>();

      let histoAt3Points = this.createChracterStepFiveForm.get('historicAtThree').value;
      histoAt3Points.level = 3;

      let histoAt2Points = this.createChracterStepFiveForm.get('historicAtTwo').value;
      histoAt2Points.level = 2;

      let histoAt1Point = this.createChracterStepFiveForm.get('historicAtOne').value;
      histoAt1Point.level = 1;

      histo.push(histoAt3Points);
      histo.push(histoAt2Points);
      histo.push(histoAt1Point);

      this.characterService.setHistorics(histo);
    }
  }

  validationStepSix() {
    if (this.createCharacterStepSixForm.valid) {
      let disciplines = new Array<Discipline>();

      let mainDiscipline = this.createCharacterStepSixForm.get('disciplineAtTwo').value;
      mainDiscipline.level = 2;

      disciplines.push(mainDiscipline);

      let lvlOneDisciplineA = this.createCharacterStepSixForm.get('disciplineAtOneA').value;
      lvlOneDisciplineA.level = 1;
      disciplines.push(lvlOneDisciplineA);

      let lvlOneDisciplineB = this.createCharacterStepSixForm.get('disciplineAtOneB').value;
      lvlOneDisciplineB.level = 1;
      disciplines.push(lvlOneDisciplineB);

      this.characterService.setDiscplines(disciplines);
    }
  }

  validationStepSeven() {
    
  }

  addGenericAtout() {
    const atout = this.fb.group({
      atouts: [null],
    });

    this.gAtouts.push(atout);
  }
  
  addClanAtout(){
    const atout = this.fb.group({
      atouts: [null],
    });

    this.cAtouts.push(atout);
  }

  addAlligianceAtout(){
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
}
