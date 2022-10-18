import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent, MetamaskNotInstalled } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialExampleModule } from '../material.module';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { CreateNFTStartComponent } from './create-nftstart/create-nftstart.component';
import { CreateNFTMainComponent } from './create-nftmain/create-nftmain.component';
import { NftSuccessComponent } from '../nft-success/nft-success.component';
import { TransferNftComponent } from './transfer-nft/transfer-nft.component';

@NgModule({
    declarations: [
        DashboardComponent,
        UserDetailsComponent,
        MetamaskNotInstalled,
        WalletListComponent,
        CreateNFTStartComponent,
        CreateNFTMainComponent,
        NftSuccessComponent,
        TransferNftComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialExampleModule
    ],
    exports: [
        DashboardComponent 
    ]
})
export class DashboardModule { }