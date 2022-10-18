import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss']
})
export class WalletListComponent implements OnInit {
  @Output() connectwalletEmiitedData = new EventEmitter<any>();
  constructor(public dialogRef: MatDialogRef<WalletListComponent>) { }

  ngOnInit(): void {
  }

  connectwallet(walletName: string) {
    if(walletName.toUpperCase() == "METAMASK") {
      this.dialogRef.close();
      this.connectwalletEmiitedData.emit("METAMASK")

    }
  }

}
