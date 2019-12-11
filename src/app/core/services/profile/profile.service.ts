import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { DateHelper } from 'src/app/shared/services';
import { ProfileRepository, FetchProfile } from '../../api/profile';
import { Profile } from './profile.interface';
import { FetchOptions } from '../../shared/fetch-options';
import { OrderType } from '../../shared/order';
import { DataResponse } from '../../shared/data-response';

function sortFunc(orderBy: string) {
  return (left: Profile, right: Profile) => {
    return left[orderBy] > right[orderBy] ? 1 : left[orderBy] < right[orderBy] ? -1 : 0;
  }
}

@Injectable()
export class ProfileService {
  data = this.profileRepository.findAll()
    .pipe(
      map((data: FetchProfile[]) => {
        return data.map((element: FetchProfile) => this.mapProfile(element))
      }),
      shareReplay()
    );
  
  constructor(
    private profileRepository: ProfileRepository,
  ) { }

  mapProfile(profile: FetchProfile): Profile {
    return {
      ...profile,
      name: `${profile.prefix}. ${profile.first_name} ${profile.last_name}`,
      modified: DateHelper.formatDate(profile.modified),
    } 
  }

  getEntitiesData(options: FetchOptions): Observable<DataResponse<Profile>> {
    return this.data
      .pipe(
        map((data: Profile[]) => {
          let payload = data.filter((element) => {
            return element.name.includes(options.search) || element.email.includes(options.search);
          });
          payload = payload.sort(sortFunc(options.orderBy));

          if (options.order === OrderType.Desc) {
            payload = payload.reverse();
          }

          const start = (options.page - 1) * options.pageSize;
          const end = start + options.pageSize;

          return {
            payload: payload.slice(start, end),
            total: payload.length
          }
        })
      );
  }

  getEntityById(id: number): Observable<Profile | undefined> {
    return this.data
      .pipe(
        map((data: Profile[]) => {
          return data.find(element => element.localid === id);
        })
      );
  }
}
