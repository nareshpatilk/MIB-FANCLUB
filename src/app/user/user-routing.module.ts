import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { UserComponent } from './user.component';
import { ServerServices } from '../server.service'


const userRoutes: Routes = [
    { path: '', component: UserComponent, children: [
      
      ]
      
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes),
        FormsModule
      ],
      exports: [RouterModule],
      providers: [ServerServices]
})

export class UserRoutingModule { }
