import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import contractAbi from 'src/app/contract-abi.json';
import { environment } from 'src/environments/environment';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-nft',
  templateUrl: './transfer-nft.component.html',
  styleUrls: ['./transfer-nft.component.scss']
})
export class TransferNftComponent implements OnInit {
  image: string = "";
  tokenId: string = "";
  userAdd: string = "";
  loader = false;
  transactionHash: string= "";
  link: string = "";
  FormData = new UntypedFormGroup({
    receiveraddress: new UntypedFormControl('', [Validators.required]),
})

  @Output() dashbooard = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<TransferNftComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.image = this.data.image;
    this.tokenId = this.data.tokenId;
    this.userAdd = this.data.address;
  }

  async transferTokens() {
    const provider = await detectEthereumProvider();

    if (provider) {
      this.loader = true;
      const rpcURL = new Web3.providers.HttpProvider(`https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`)
      const web3 = new Web3(rpcURL)
      const nftContract = new web3.eth.Contract(contractAbi as any, environment.Contract_Address);
      let data = {
        to: environment.Contract_Address, // Required except during contract publications.
        from: this.userAdd, // must match user's active address.
        data: nftContract.methods.safeTransferFrom(this.userAdd, this.FormData.value.receiveraddress, this.tokenId).encodeABI(), //make call to NFT smart contract
        maxPriorityFeePerGas: null,
        maxFeePerGas: null,
      }


      const hash = await (window as any).ethereum.request({
        method: 'eth_sendTransaction',
        params: [data],
      })
      this.transactionHash = hash;
      this.link = `https://goerli.etherscan.io/tx/${this.transactionHash}`
      this.loader = false;
    }

  }

  goToDashbooard() {
    window.open(this.link, "_blank");
    this.dashbooard.emit(true)
  }

}
