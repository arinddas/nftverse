import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNFTMainComponent } from './create-nftmain/create-nftmain.component';
import { CreateNFTStartComponent } from './create-nftstart/create-nftstart.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'createNFT/start', component: CreateNFTStartComponent },
  { path: 'createNFT/ERC721', component: CreateNFTMainComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }