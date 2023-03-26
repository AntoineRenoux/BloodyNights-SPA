import { GameService } from '@shared/services/game.service';
import { Allegiance } from "./allegiance";

export class ChronicleParameter {
  allegiances: Array<Allegiance>;

  constructor(private gameService: GameService) {
    this.gameService.getSects().subscribe((sects: Allegiance[]) => {
      this.allegiances = sects;
    });
  }
}
