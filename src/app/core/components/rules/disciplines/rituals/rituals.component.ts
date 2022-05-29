import { Discipline, Ritual } from '@core/models/game/discipline';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '@shared/services/game.service';
import { ItemMenu } from '@core/models/itemMenu';
import { timer } from 'rxjs';

@Component({
  templateUrl: './rituals.component.html',
  styleUrls: ['./rituals.component.scss']
})
export class RitualsComponent implements OnInit {

  ritual: Ritual;
  discipline: Discipline;

  constructor(private route: ActivatedRoute,
              private gameService: GameService) {
     }

  ngOnInit(): void {
    if (this.gameService.itemsMenuForNavigation$.value === null) {
      timer().subscribe(() => this.setListItemsMenu());
    }

    this.route.paramMap.subscribe(params => {
      const discipline = params.get('discipline');
      const ritual = params.get('ritual').toUpperCase();
      this.gameService.getDisciplineByKey(discipline).subscribe((d: Discipline) => {
        this.discipline = d;
        if (ritual !== 'home') {
          this.ritual = d.rituals.find(x => x.key === ritual);
        }
      })
    });

    console.log("RitualsComponent loaded");
  }

  setListItemsMenu() {

    let listItems = new Array<ItemMenu>();

    this.gameService.getDisciplines().subscribe((d: Discipline[]) => {
      if (d != null) {
        d.forEach(disci => {
          listItems.push(this.converteDisciplineToItemMenu(disci, null));
        });
        this.gameService.itemsMenuForNavigation$.next(listItems);
      }
    });
  }

  private converteDisciplineToItemMenu(discipline: Discipline, previousUrl: string): ItemMenu {

    var children = new Array<ItemMenu>();
    var url = previousUrl == null ? '/rules/disciplines' : previousUrl;

    url += '/' + discipline.key;

    if (discipline.childrenDisciplines.length > 0) {
      discipline.childrenDisciplines.forEach(cd => {
        children.push(this.converteDisciplineToItemMenu(cd, url));
      });
    }

    if (discipline.rituals.length > 0) {
      let ritualLevel = new Array<ItemMenu>();

      for (let index = 1; index <= discipline.rituals[discipline.rituals.length - 1].level; index++) {
        let ritualArrayCurrentLevel = new Array<ItemMenu>();

        discipline.rituals.filter(x => x.level == index).forEach(r => {
          ritualArrayCurrentLevel.push(new ItemMenu(r.key, r.name, url + '/rituals/' + r.key, null ));
        });

        ritualLevel.push(new ItemMenu(null, 'Level ' + index, null, ritualArrayCurrentLevel));
      }

      let rituals = new ItemMenu(null, 'RITUALS', url + '/rituals/home', ritualLevel)

      children.push(rituals);
    }

    return new ItemMenu(discipline.key, discipline.name, url, children);
  }
}
