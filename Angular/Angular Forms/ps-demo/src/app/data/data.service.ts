import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { UserSettings } from './user-settings';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
   }

  postUserSettingsForm(userSettings: UserSettings): Observable<any> {
    return this.httpClient.post('https://www.putsreq.com/Nd6ULnuVZdZA5sE1YmpL', userSettings);
    // return of(userSettings);
  }

  getSubscriptionTypes(): Observable<string[]> {
    return of (['a','b','c']);
  }
}
