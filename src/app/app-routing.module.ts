import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [

  // { path: 'historico' , loadChildren: () => import( './historico/historico.module').then(m => m.HistoricoModule), canActivate: [UserGuardService] },
  // { path: 'agenda', component: AgendaComponent },
  // { path: 'agenda', component: AgendaComponent, canActivate: [UserGuardService] },

  { path: '' , component: HomeComponent },
  // { path: 'envio-deals', loadChildren: () => import('./envio-deals/envio-deals.module').then(m => m.EnvioDealsModule), canActivate: [UserGuardService] },

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
