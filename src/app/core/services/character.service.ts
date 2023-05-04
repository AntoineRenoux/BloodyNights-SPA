import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl = environment.apiUrl + 'character/';

  private chronicleSelectedForCreation: string;

  constructor(private http: HttpClient) { }

  setChronicleSelectedForCreation(chronicleId: string){
    this.chronicleSelectedForCreation = chronicleId;
  }

  getChronicleSelectedForCreation(){
    return this.chronicleSelectedForCreation;
  }

}
