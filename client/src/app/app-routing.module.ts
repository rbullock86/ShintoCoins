import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BuyComponent } from './buy/buy.component';
import { LedgerComponent } from './ledger/ledger.component';
import { MineComponent } from './mine/mine.component';
import { SellComponent } from './sell/sell.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'ledger', component: LedgerComponent },
  { path: 'mine', component: MineComponent },
  { path: 'sell', component: SellComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
