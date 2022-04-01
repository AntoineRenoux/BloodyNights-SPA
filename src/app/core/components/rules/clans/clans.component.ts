import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clan } from '@core/models/game/clan';
import { ItemMenu } from '@core/models/itemMenu';
import { GameService } from '@shared/services/game.service';
import { timer } from 'rxjs';

@Component({
  templateUrl: './clans.component.html',
  styleUrls: ['./clans.component.scss']
})
export class ClansComponent implements OnInit {

  clan: Clan;
  key: string;

  listItems: ItemMenu[];

  constructor(private gameService: GameService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("ClanComponent loaded");

    this.route.paramMap.subscribe(params => {
      const discipline = params.get('clan');
      const path = params.get('bloodline');
      this.key = path != null ? path : discipline;
      if (this.key != null) {
        this.getClanByKey(this.key);
      }
    });

    timer().subscribe(() => this.setListItemsMenu());
  }

  getClanByKey(key: string) {
    this.gameService.getClanByKey(key).subscribe((clan: Clan) => {
      this.clan = clan;
    })
  }

  setListItemsMenu() {
    this.listItems = new Array<ItemMenu>();

    this.gameService.getClans().subscribe((c: Clan[]) => {
      if (c != null) {
        c.forEach(clan => {
          this.listItems.push(this.converteClanToItemMenu(clan, null));
        });
        this.gameService.itemsMenuForNavigation$.next(this.listItems);
      }
    });
  }

  private converteClanToItemMenu(clan: Clan, previousUrl: string): ItemMenu {
    var children = new Array<ItemMenu>();
    var url = previousUrl == null ? '/rules/clans/' : previousUrl;

    url += '/' + clan.key;

    if (clan.bloodlines.length > 0) {
      clan.bloodlines.forEach(cb => {
        children.push(this.converteClanToItemMenu(cb, url));
      });
    }

    return new ItemMenu(clan.key, clan.name, url, children);
  }

}
