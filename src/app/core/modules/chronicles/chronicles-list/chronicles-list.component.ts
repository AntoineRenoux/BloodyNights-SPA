import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chronicle } from '@core/models/chronicle';
import { ChronicleService } from '@core/services/chronicle.service';

@Component({
  selector: 'app-chronicles-list',
  templateUrl: './chronicles-list.component.html',
  styleUrls: ['./chronicles-list.component.scss']
})
export class ChroniclesListComponent implements OnInit {

  chronicles: Chronicle[];
  displayedColumns = ['name', 'faction', 'theme', 'mood', 'localization', 'startDate', 'endDate', 'nextDate', 'action'];

  constructor(private chronicleService: ChronicleService,
    private route: Router) {
    this.chronicleService.getAll().subscribe((ch: Chronicle[]) => {
      this.chronicles = ch;
    })
  }

  ngOnInit() {
  }

  redirectToCharacterCreation(chronicId: string){
    this.route.navigate(['character/create', chronicId])
  }

}
