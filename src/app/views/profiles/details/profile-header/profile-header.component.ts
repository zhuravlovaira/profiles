import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Profile } from 'src/app/core/services/profile';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  @Input() profile: Profile;
}
