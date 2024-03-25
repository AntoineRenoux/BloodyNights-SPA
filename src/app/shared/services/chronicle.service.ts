import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChronicleService {

  private baseUrl = environment.apiUrl + 'chronicle/';

  constructor(private http: HttpClient) { }

  

}
