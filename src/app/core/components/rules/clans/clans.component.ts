import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clan } from '@core/models/game/clan';
import { ItemMenu } from '@core/models/itemMenu';
import { ClanService } from '@shared/services/clan.service';
import { NavigationService } from '@shared/services/navigation.service';
import { timer } from 'rxjs';

@Component({
  templateUrl: './clans.component.html',
  styleUrls: ['../rules.component.scss']
})
export class ClansComponent implements OnInit {

  clan: Clan;
  key: string;

  constructor(private route: ActivatedRoute,
    private navigationService: NavigationService,
    private clanService: ClanService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const clan = params.get('clan');
      const bloodline = params.get('bloodline');
      this.key = bloodline != null ? bloodline : clan;
      if (this.key != null) {
        this.getClanByKey(this.key);
      }
    });
  }

  getClanByKey(key: string) {
    this.clanService.getClanByKey(key).subscribe((clan: Clan) => {
      this.clan = clan;
    })
  }

  setListItemsMenu() {
    let listItems = new Array<ItemMenu>();

    this.clanService.getClans().subscribe((c: Clan[]) => {
      if (c != null) {
        c.forEach(clan => {
          listItems.push(this.converteClanToItemMenu(clan, null));
        });
        this.navigationService.itemsMenuForNavigation$.next(listItems);
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
