import { NgModule } from '@angular/core';

import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { CoreComponent } from './core.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlayerComponent } from './player/player.component';
import { PlayerDetailsComponent } from "src/app/core/core/player/player-details/player-details.component";

const coreRoutes: Routes = [
{path: '', component: CoreComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'player', component: PlayerComponent },
    { path: 'player-details/:id', component: PlayerDetailsComponent },
   { path : '**', redirectTo: 'login' }
]}
];

@NgModule({
    imports: [
        RouterModule.forChild(coreRoutes)
      ],
      exports: [RouterModule]
})

export class CoreRoutingModule { }
