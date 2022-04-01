import { GameService } from '@shared/services/game.service';
import { Component, OnInit } from '@angular/core';
import { ItemMenu } from '@core/models/itemMenu';

@Component({
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  navigationMenu = new Array<ItemMenu>();

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    console.log("RulesComponent loaded");

    this.gameService.itemsMenuForNavigation$.subscribe((d) => {
      this.navigationMenu = d;
    });
  }
}
