import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';

import { CoreComponent } from './core.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MatInputModule, MatCardModule, MatSelectModule, MatFormFieldModule ,
         MatButtonModule, MatDividerModule } from '@angular/material'; 
import { PlayerComponent } from './player/player.component';
import { PlayerDetailsComponent } from './player/player-details/player-details.component';
@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule, 

  ],
  declarations: [
    CoreComponent,
    LoginComponent,
    RegisterComponent,
    PlayerComponent,
    PlayerDetailsComponent
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class CoreModule { }
