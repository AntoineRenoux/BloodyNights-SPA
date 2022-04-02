import { Component, Input, OnInit } from '@angular/core';
import { ItemMenu } from '@core/models/itemMenu';
import { GameService } from '@shared/services/game.service';

@Component({
  selector: 'bn-rules-left-fixed-menu',
  templateUrl: './left-fixed-menu.component.html',
  styleUrls: ['./left-fixed-menu.component.scss']
})
export class LeftFixedMenuComponent implements OnInit {

  menus: ItemMenu[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    console.log("LeftFixedMenuComponent loaded");

    this.gameService.itemsMenuForNavigation$.subscribe((d) => {
      this.menus = d;
    });
  }

}
