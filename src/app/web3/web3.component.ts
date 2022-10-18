import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web3',
  templateUrl: './web3.component.html',
  styleUrls: ['./web3.component.scss']
})
export class Web3Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('/dashboard');
  }
}
