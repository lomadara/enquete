import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePoolComponent } from './pages/create-pool/create-pool.component'
import { StatusPoolComponent } from './pages/status-pool/status-pool.component'
import { SucessPageComponent } from './pages/sucess-page/sucess-page.component';
import { VotePoolComponent } from './pages/vote-pool/vote-pool.component'

const routes: Routes = [
  {path: '', redirectTo: '/create', pathMatch: 'full'},
  {path: 'create', component: CreatePoolComponent},
  {path: 'status/:id', component: StatusPoolComponent},
  {path: 'vote/:id', component: VotePoolComponent},
  {path: 'success', component: SucessPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
