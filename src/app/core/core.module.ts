import { NgModule } from '@angular/core';

import { ApiModule } from './api';
import { ServicesModule } from './services';


@NgModule({
  declarations: [],
  imports: [
    ApiModule,
    ServicesModule,
  ]
})
export class CoreModule { }
