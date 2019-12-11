import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Profile } from 'src/app/core/services/profile';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  profile: Observable<Profile>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.profile = this.activatedRoute.data.pipe(pluck('profile'));
  }
}
