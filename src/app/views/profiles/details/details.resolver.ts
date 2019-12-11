import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService, Profile } from 'src/app/core/services/profile';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileDetailsResolver implements Resolve<Profile> {
  constructor(private profileService: ProfileService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Profile> {
    return this.profileService.getEntityById(+route.paramMap.get('id'))
      .pipe(
        map((data) => {
          if(!data) {
            this.redirectToNotFound();
          }
          return data;
        })
      );
  }

  // todo move to separate service
  redirectToNotFound(): never {
    this.router.navigate(['/not-found']);
    throw new Error('Not found');
  }
}