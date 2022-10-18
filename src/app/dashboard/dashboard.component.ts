import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import detectEthereumProvider from '@metamask/detect-provider';
import { UserDetailsComponent } from './user-details/user-details.component';
import Web3 from 'web3';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import contractAbi from 'src/app/contract-abi.json';
import { Observable } from 'rxjs';
import axios from "axios";
import { TransferNftComponent } from './transfer-nft/transfer-nft.component';

interface NFTs {
    name: string
    description: string
    image: File
}

interface Data {
    data: Observable<NFTs>
    tokenId: string
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public userAddress: string = "";
    public availableBalance: string = "";
    rpcURL: any;
    userNFTs: any = [];
    getDataFromTokenUris: any = []
    loading = false;

    constructor(public dialog: MatDialog,
        private router: Router) {
    }

    async ngOnInit(): Promise<void> {
        this.rpcURL = new Web3.providers.HttpProvider(`https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`)
        await this.getCurrentWalletConnected();
        console.log("Hello user")

        this.listAllNFTs();

    }

    async getCurrentUserNFTs() {
        const web3 = new Web3(this.rpcURL)
        const nftContract = new web3.eth.Contract(contractAbi as any, environment.Contract_Address);
        console.log(await nftContract.methods.balanceOf(this.userAddress))
    }


    walletConnect() {
        let dialogRef = this.dialog.open(WalletListComponent, {
            panelClass: 'custom-modalbox'
        })

        const dialogSubmitSubscription =
            dialogRef.componentInstance.connectwalletEmiitedData.subscribe(result => {
                this.connectWithMetaMask();
                dialogSubmitSubscription.unsubscribe();
            });

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

    async connectWithMetaMask() {
        const provider = await detectEthereumProvider();

        if (provider) {
            console.log('Ethereum successfully detected!');
            const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' })
            this.userAddress = accounts[0]
            console.log(accounts)
            const web3 = new Web3((window as any).ethereum)
            const weiBalance = await web3.eth.getBalance(this.userAddress)
            this.availableBalance = Web3.utils.fromWei(weiBalance, 'ether');
            window.location.reload()
        }
        else {
            console.error('Please install MetaMask!');
            this.dialog.open(MetamaskNotInstalled);
        }
    }


    openUserAccounts(accountAddress: string) {
        const dialogRef = this.dialog.open(UserDetailsComponent, {
            data: { address: accountAddress, balance: this.availableBalance },
            position: {
                top: '100px',
                right: '30px',
            },
            panelClass: 'custom-modalbox'
        });

        const dialogSubmitSubscription =
            dialogRef.componentInstance.signedOut.subscribe(result => {
                (window as any).ethereum.on('disconnect', (code: any, reason: any) => {
                    console.log(`Ethereum Provider connection closed: ${reason}. Code: ${code}`);
                });
                dialogSubmitSubscription.unsubscribe();
            });
    }

    createNFTs() {
        this.router.navigateByUrl('/createNFT/start');
    }

    listAllNFTs = async () => {
        this.getDataFromTokenUris = []
        let getTokenIds: any;
        this.loading = true;
        const rpcURL = new Web3.providers.HttpProvider(`https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`)
        const web3 = new Web3(rpcURL)
        const nftContract = new web3.eth.Contract(contractAbi as any, environment.Contract_Address);
        const resp = await nftContract.methods.getTokenIds(this.userAddress).call().then((response: any) => {
            getTokenIds = response
        })
        console.log("tokenIds: ", getTokenIds)
        await Promise.all(getTokenIds.map(async (element: string) => {
            const IPFSURI = await nftContract.methods.tokenURI(element).call()
            this.getDataFromTokenUris.push({
                ipfsUrl: IPFSURI,
                tokenId: element
            })
        }));

        for (let element of this.getDataFromTokenUris) {
            await axios.get(element.ipfsUrl).then(response => {
                console.log(response.data);
                this.userNFTs.push({
                    data: response.data,
                    tokenId: element.tokenId
                })
            });
        }
        this.loading = false;
        console.log(this.userNFTs)
    }


    viewOnOpenSea(tokenId: string) {
        window.open(`${environment.OpenSeaUrl}/${environment.Contract_Address}/${tokenId}`, '_blank');
    }


    send(token: any) {
        console.log(token)
        const dialogRef = this.dialog.open(TransferNftComponent, {
            data: { tokenId: token.tokenId, image: token.data.image, address: this.userAddress },
            panelClass: 'custom-transferbox'
        });

        const dialogSubmitSubscription =
            dialogRef.componentInstance.dashbooard.subscribe(result => {
                window.location.reload();
                dialogSubmitSubscription.unsubscribe();
            });


    }

}

@Component({
    selector: 'metamask-not-installed',
    templateUrl: 'metamask-not-installed.html',
})
export class MetamaskNotInstalled { }