import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/profiles',
    pathMatch: 'full'
  },
  {
    path: 'profiles',
    children: [
      {
        path: '',
        loadChildren: () => import('../views/profiles/list/list.module').then(m => m.ListModule)
      },
      {
        path: ':id',
        loadChildren: () => import('../views/profiles/details/details.module').then(m => m.DetailsModule)
      },
    ]
  },
  {
    path: 'not-found',
    loadChildren: () => import('../views/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '**',
    redirectTo: '/profiles',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
