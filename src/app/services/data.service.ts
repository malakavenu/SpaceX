import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'https://api.spaceXdata.com/v3/launches?limit=100';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getData(obj) {
    if (obj) {
      return this.httpClient.get(apiUrl, { params: obj });
    } else {
      return this.httpClient.get(apiUrl);
    }
  }
}
