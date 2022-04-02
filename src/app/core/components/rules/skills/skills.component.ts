import { timer } from 'rxjs';
import { GameService } from '@shared/services/game.service';
import { Component, OnInit } from '@angular/core';
import { ItemMenu } from '@core/models/itemMenu';
import { Skill } from '@core/models/game/skill';

@Component({
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skills: Skill[];
  listItems: ItemMenu[];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    console.log("SkillsComponent loaded");
    this.gameService.getSkills().subscribe((skills: Skill[]) => {
      this.skills = skills
    });

    timer().subscribe(() => this.setListItemsMenu());
  }

  setListItemsMenu() {
    this.gameService.getSkills().subscribe((s: Skill[]) => {
      if (s != null) {
        this.listItems = new Array<ItemMenu>();

        s.forEach(skill => {
          this.listItems.push(this.converteSkillToItemMenu(skill));
        });

        this.gameService.itemsMenuForNavigation$.next(this.listItems);
      }
    });
  }

  private converteSkillToItemMenu(skill: Skill): ItemMenu {
    let url = 'skills#' + skill.name.split('_')[0];
    return new ItemMenu(skill.name, skill.name, url);
  }
}
