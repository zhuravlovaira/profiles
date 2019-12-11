import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDetailComponent {
  @Input() profile: Profile;
}
