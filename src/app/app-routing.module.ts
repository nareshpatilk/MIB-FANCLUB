import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { VideosComponent } from "src/app/core/videos/videos.component";




const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'login-information',
    loadChildren: './core/core/core.module#CoreModule'
  },
  {
    path: 'admin-access',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'user-access',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path:  'home/jwttoken/:Token/user/:user/type/:type/id/:id',
    component: HomeComponent
  },
  {
    path:  'videos',
    component: VideosComponent
  },
  {
    path: 'merchandise',
    loadChildren: './core/merchandise/merchandise.module#MerchandiseModule'
  },
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
