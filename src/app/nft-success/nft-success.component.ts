import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nft-success',
  templateUrl: './nft-success.component.html',
  styleUrls: ['./nft-success.component.scss']
})
export class NftSuccessComponent implements OnInit {
  link: string;
  transactionHash: string = "";
  network = "";
  constructor(public dialogRef: MatDialogRef<NftSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.transactionHash = this.data.hash;
    this.network = this.data.network;

    if (this.network == 'etherum') {
      this.link = `https://goerli.etherscan.io/tx/${this.transactionHash}`
    } else {
      this.link = `${environment.HostName}:${environment.BlockExplorerPort}/tx/${this.transactionHash}`
    }

  }

}
