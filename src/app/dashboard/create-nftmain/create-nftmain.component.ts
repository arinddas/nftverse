import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormBuilder, UntypedFormControl, Validators } from '@angular/forms'
import { PinataService } from 'src/app/pinata.service';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import contractAbi from 'src/app/contract-abi.json'
import { map, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment'
import { MatDialog } from '@angular/material/dialog';
import { NftSuccessComponent } from 'src/app/nft-success/nft-success.component';
import { ActivatedRoute } from '@angular/router';

interface Transaction {
    to: string
    from: string
    data: string
}
@Component({
    selector: 'app-create-nftmain',
    templateUrl: './create-nftmain.component.html',
    styleUrls: ['./create-nftmain.component.scss']
})
export class CreateNFTMainComponent implements OnInit {
    url: any = "";
    pinata: any;
    public userAddress: string = "";
    public availableBalance: string = "";
    loader: boolean = false;
    transactionHash: any;
    selectedNetwork: any;
    FormData = new UntypedFormGroup({
        name: new UntypedFormControl('', [Validators.required]),
        description: new UntypedFormControl('', [Validators.required]),
    })

    constructor(
        private pinataService: PinataService, public dialog: MatDialog, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.getCurrentWalletConnected()
        this.transactionHash = "";
        this.selectedNetwork = this.route.snapshot.queryParamMap.get('network');
    }

    onSelectFile(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);

            reader.onload = (event) => {
                this.url = event.target!.result;

            }
        }
    }

    async getCurrentWalletConnected() {
        const provider = await detectEthereumProvider();

        if (provider) {
            console.log('Ethereum successfully detected!');
            const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                this.userAddress = accounts[0]
                console.log(accounts)
                const web3 = new Web3((window as any).ethereum)
                const weiBalance = await web3.eth.getBalance(this.userAddress)
                this.availableBalance = Web3.utils.fromWei(weiBalance, 'ether');
            }
        }
    }

    async createItem() {
        if (this.selectedNetwork === "etherum") {
            this.mintonEtherNetwork()
        } else {
            this.mintonBesu()
        }
    }

    async mintonEtherNetwork() {
        let data = {
            "name": this.FormData.value.name,
            "description": this.FormData.value.description,
            "image": this.url
        }
        this.loader = true;
        let tokenUri = "";
        const rpcURL = new Web3.providers.HttpProvider(`https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`)
        const web3 = new Web3(rpcURL)
        const nftContract = new web3.eth.Contract(contractAbi as any, environment.Contract_Address);
        console.log('nftContract', nftContract)

        this.pinataService.pinJsonToIpfs(data).pipe(
            map((response: any) => {
                console.log(response.IpfsHash)
                tokenUri = `https://ipfs.io/ipfs/${response.IpfsHash}`

                return {
                    to: environment.Contract_Address, // Required except during contract publications.
                    from: this.userAddress, // must match user's active address.
                    data: nftContract.methods.mintNFt(tokenUri).encodeABI(), //make call to NFT smart contract
                    maxPriorityFeePerGas: null,
                    maxFeePerGas: null,
                }
            }),
            mergeMap((transactionData: Transaction) => (window as any).ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionData],
            }))).subscribe(hash => {
                this.loader = false
                console.log("Transaction Hash:  ", hash)
                this.transactionHash = hash;

                this.dialog.open(NftSuccessComponent, {
                    data: { hash: this.transactionHash, network: "etherum" },
                    panelClass: 'custom-modalbox'
                });
            })
    }



    async mintonBesu() {
        let data = {
            "name": this.FormData.value.name,
            "description": this.FormData.value.description,
            "image": this.url
        }
        this.loader = true;
        let tokenUri = "";
        const rpcURL = new Web3.providers.HttpProvider(`${environment.HostName}/${environment.Port}`)
        const web3 = new Web3(rpcURL)
        const nftContract = new web3.eth.Contract(contractAbi as any, environment.BesuContract_address);
        console.log('nftContract', nftContract)

        this.pinataService.pinJsonToIpfs(data).pipe(
            map((response: any) => {
                console.log(response.IpfsHash)
                tokenUri = `https://ipfs.io/ipfs/${response.IpfsHash}`

                return {
                    to: environment.BesuContract_address, // Required except during contract publications.
                    from: this.userAddress, // must match user's active address.
                    data: nftContract.methods.mintNFt(tokenUri).encodeABI(), //make call to NFT smart contract
                    maxPriorityFeePerGas: null,
                    maxFeePerGas: null,
                }
            }),
            mergeMap((transactionData: Transaction) => (window as any).ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionData],
            }))).subscribe(hash => {
                this.loader = false
                console.log("Transaction Hash:  ", hash)
                this.transactionHash = hash;

                this.dialog.open(NftSuccessComponent, {
                    data: { hash: this.transactionHash, network: "besu" },
                    panelClass: 'custom-modalbox'
                });
            })
    }


}
