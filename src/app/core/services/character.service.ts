import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '@core/models/game/character';
import { Clan } from '@core/models/game/clan';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl = environment.apiUrl + 'character/';

  private character$: BehaviorSubject<Character> = new BehaviorSubject<Character>(new Character());

  constructor(private http: HttpClient) { 
  }

  getCharacter(): Observable<Character> {
    return this.character$;
  }

  setCurrentExperience(currentExperience: number) {
    this.character$.getValue().currentExperience = currentExperience;
  }

  setConcept(concept: string) {
    this.character$.getValue().concept = concept;
  }

  setArchetype(archetype: string) {
    this.character$.getValue().archetype = archetype;
  }
  
  setClan(clan: Clan) {
    this.character$.getValue().clan = clan;
  }
  
  setCharacter(character: Character) {
    this.character$.next(character);
  }

}
