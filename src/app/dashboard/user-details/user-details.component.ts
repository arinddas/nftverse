import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  address: string = "";
  balance: string = "";
  @Output() signedOut = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.address = this.data.address;
    this.balance = this.data.balance;
  }

  signOut() {
    this.dialogRef.close();
    this.signedOut.emit(true)
  }

  truncateAddress(address: string) {
    var truncateRegex = /^(0x[a-zA-Z0-9]{9})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

    var match = this.address.match(truncateRegex);
    if (!match)
      return address;
    return match[1] + "\u2026" + match[2];
  }
}
