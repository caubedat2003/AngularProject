import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { StockComponent } from './features/stock/stock.component';
import { StockAddComponent } from './features/stock/stock-add/stock-add.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'stock', component: StockComponent },
  { path: 'stock-add', component: StockAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
