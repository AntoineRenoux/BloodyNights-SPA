import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '@core/models/game/character';
import { Clan } from '@core/models/game/clan';
import { Discipline } from '@core/models/game/discipline';
import { Focus } from '@core/models/game/focus';
import { Historic } from '@core/models/game/historic';
import { Skill } from '@core/models/game/skill';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl = environment.apiUrl + 'character/';

  private character: BehaviorSubject<Character> = new BehaviorSubject<Character>(new Character());
  public character$ = this.character.asObservable();

  constructor(private http: HttpClient) { 
  }

  getCharacter(): Observable<Character> {
    return this.character;
  }

  setCurrentExperience(currentExperience: number) {
    this.character.getValue().currentExperience = currentExperience;
  }

  setConcept(concept: string) {
    let currentCharacter = this.character.getValue();
    currentCharacter.concept = concept;

    this.character.next(currentCharacter);
  }

  setArchetype(archetype: string) {
    let currentCharacter = this.character.getValue();
    currentCharacter.archetype = archetype;

    this.character.next(currentCharacter);
  }
  
  setClan(clan: Clan) {
    let currentCharacter = this.character.getValue();
    currentCharacter.clan = clan;

    this.character.next(currentCharacter);
  }
  
  setAttributs(physical: number, social: number, mental: number) {
    let currentCharacter = this.character.getValue();

    currentCharacter.physical = physical;
    currentCharacter.social = social;
    currentCharacter.mental = mental;

    this.character.next(currentCharacter);
  }
  
  setFocus(focus: Focus[]){
    let currentCharacter = this.character.getValue();

    currentCharacter.focus = focus;

    this.character.next(currentCharacter);
  }

  setSkills(skills: Skill[]) {
    let currentCharacter = this.character.getValue();

    currentCharacter.skills = skills;

    this.character.next(currentCharacter);
  }

  setHistorics(historics: Historic[]) {
    let currentCharacter = this.character.getValue();

    currentCharacter.historics = historics;

    this.character.next(currentCharacter);
  }

  setDiscplines(disciplines: Discipline[]) {
    let currentCharacter = this.character.getValue();

    currentCharacter.disciplines = disciplines;

    this.character.next(currentCharacter);
  }

  setCharacter(character: Character) {
    this.character.next(character);
  }
}
