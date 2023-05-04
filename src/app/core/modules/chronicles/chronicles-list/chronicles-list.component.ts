import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chronicle } from '@core/models/chronicle';
import { CharacterService } from '@core/services/character.service';
import { ChronicleService } from '@core/services/chronicle.service';

@Component({
  selector: 'app-chronicles-list',
  templateUrl: './chronicles-list.component.html',
  styleUrls: ['./chronicles-list.component.scss']
})
export class ChroniclesListComponent implements OnInit {

  chronicles: Chronicle[];
  displayedColumns = ['name', 'description', 'faction', 'theme', 'mood', 'localization', 'startDate', 'endDate', 'nextDate', 'action'];

  constructor(private chronicleService: ChronicleService,
    private route: Router,
    private characterService: CharacterService) {
    this.chronicleService.getAll().subscribe((ch: Chronicle[]) => {
      this.chronicles = ch;
    })
  }

  ngOnInit() {
  }

  redirectToCharacterCreation(chronicId: string){
    this.characterService.setChronicleSelectedForCreation(chronicId);
    this.route.navigate(['character/create'])
  }

}
