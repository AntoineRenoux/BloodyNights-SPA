import { Component, Input, OnInit } from '@angular/core';
import { Character } from '@core/models/game/character';
import { CharacterService } from '@core/services/character.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bn-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  @Input() stepperType: string;
  
  currentCharacter: Character;

  constructor(
    private characterService: CharacterService,
    public trad: TranslateService
  ) {
      this.characterService.getCharacter().subscribe((c: Character) => {
        this.currentCharacter = c;
        console.log('Dans le stepper');
        console.log(c);
      });

    }
    
    ngOnInit(): void {}

}
