import { ChronicleService } from '@core/services/chronicle.service';
import { CharacterService } from '@core/services/character.service';
import { Component, OnInit } from '@angular/core';
import { Chronicle } from '@core/models/chronicle';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.scss']
})
export class CreateCharacterComponent implements OnInit {

  currentChronicle: Chronicle;

  constructor(private characterService: CharacterService,
    private chronicleService: ChronicleService,
    private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.chronicleService.getById(params['chronicleId']).subscribe((c: Chronicle) => {
        this.currentChronicle = c;
        console.log(this.currentChronicle);
      });
    });


  }

  ngOnInit() {
  }

}
