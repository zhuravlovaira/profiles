import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from './details.component';
import { HeaderModule } from 'src/app/shared/ui-components';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { QuickFactsComponent } from './quick-facts/quick-facts.component';
import { ProfileDetailsResolver } from './details.resolver';

const routes: Routes = [
  {
    path: '',
    component: DetailsComponent,
    resolve: {
      profile: ProfileDetailsResolver
    }
  }
];

@NgModule({
  declarations: [
    DetailsComponent,
    ProfileHeaderComponent,
    ProfileDetailComponent,
    QuickFactsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTabsModule,
    HeaderModule,
    MatIconModule,
    MatCardModule,
  ]
})
export class DetailsModule { }
