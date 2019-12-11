import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FetchProfile } from './fetch-profile.interface';

const SOURCE_URL = 'https://profiles-list.firebaseio.com/Data.json';

@Injectable()
export class ProfileRepository {
  constructor(
    private httpClient: HttpClient,
  ) { }

  findAll(): Observable<FetchProfile[]> {
    return this.httpClient
      .get<FetchProfile[]>(SOURCE_URL);
  }
}
