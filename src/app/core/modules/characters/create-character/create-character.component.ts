import { ChronicleService } from '@core/services/chronicle.service';
import { CharacterService } from '@core/services/character.service';
import { Component, OnInit } from '@angular/core';
import { Chronicle } from '@core/models/chronicle';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Character } from '@core/models/game/character';
import { Archetype } from '@core/models/game/archetype';
import { GameService } from '@shared/services/game.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {

  currentChronicle: Chronicle;

  archetypes: Archetype[];

  createCharacterStepOneForm: FormGroup;
  createCharacterStepTwoForm: FormGroup;
  newCharacter = new Character();

  constructor(private characterService: CharacterService,
    private gameService: GameService,
    private chronicleService: ChronicleService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    this.route.params.subscribe(params => {
      this.chronicleService.getById(params['chronicleId']).subscribe((c: Chronicle) => {
        this.currentChronicle = c;
      });
    });

    this.gameService.getArchetypes().subscribe((archetypes: Archetype[]) => {
      this.archetypes = archetypes;
    })

  }

  ngOnInit() {
    this.initCreateCharacterFormsOne();
  }

  initCreateCharacterFormsOne() {
    this.createCharacterStepOneForm = this.fb.group({
      concept: [this.newCharacter.concept, Validators.required],
      archetype: [this.newCharacter.archetype, Validators.required],
    });
  }

  initCreateCharacterFormTwo() {
    this.createCharacterStepTwoForm = this.fb.group({

    });
  }

}
