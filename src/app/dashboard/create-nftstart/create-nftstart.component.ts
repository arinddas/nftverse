import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-nftstart',
  templateUrl: './create-nftstart.component.html',
  styleUrls: ['./create-nftstart.component.scss']
})
export class CreateNFTStartComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  create(network: string) {
    // this.router.navigateByUrl('/createNFT/ERC721');
    this.router.navigate(['/createNFT/ERC721'], { queryParams: { network } })
  }

}
