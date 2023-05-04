import { CharacterService } from './../../../services/character.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {

  constructor(private characterService: CharacterService) {
    console.log(this.characterService.getChronicleSelectedForCreation());
  }

  ngOnInit() {
  }

}
