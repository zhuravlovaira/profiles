import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProfileService, Profile } from '../../../core/services/profile';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { switchMap, shareReplay, pluck, tap } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';

import { OrderType } from 'src/app/core/shared/order';
import { FetchOptions } from 'src/app/core/shared/fetch-options';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit{
  displayedColumns = ['photo', 'localid', 'email', 'name', 'phone', 'address', 'modified', 'view'];
  pageSize = 10;
  isDataReady = false;
  payload: Observable<Profile[]>;
  total: Observable<number>;
  searchControl = new FormControl();
  options = new BehaviorSubject<FetchOptions>({
    pageSize: this.pageSize,
    page: 1,
    orderBy: 'localid',
    order: OrderType.Asc,
    search: '',
  });

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    const stream = this.options.pipe(
      switchMap((options: FetchOptions) => this.profileService.getEntitiesData(options)),
      tap(() => this.isDataReady = true),
      shareReplay()
    );
    
    this.payload = stream.pipe(pluck('payload'));
    this.total = stream.pipe(pluck('total')); 
  }

  onSearchChange(searchValue: string) {
    this.options.next({
      ...this.options.getValue(),
      search: searchValue,
    });
  }

  onPageChange(e: PageEvent) {
    this.options.next({
      ...this.options.getValue(),
      pageSize: e.pageSize,
      page: e.pageIndex + 1,
    });
  }

  onSortChange(sort: Sort) {
    this.options.next({
      ...this.options.getValue(),
      orderBy: sort.active,
      order: sort.direction === OrderType.Desc ? OrderType.Desc : OrderType.Asc,
    });
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/profiles', id]);
  }
}
