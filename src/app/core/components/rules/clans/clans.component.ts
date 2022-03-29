import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Clan } from '@core/models/game/clan';
import { GameService } from '@shared/services/game.service';

@Component({
  templateUrl: './clans.component.html',
  styleUrls: ['./clans.component.scss']
})
export class ClansComponent implements OnInit {

  @Output() clans = new EventEmitter<Clan[]>();
  clan: Clan;
  key: string;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getClans().subscribe((clans: Clan[]) => {
      this.clans.emit(clans);
    })
  }

}
