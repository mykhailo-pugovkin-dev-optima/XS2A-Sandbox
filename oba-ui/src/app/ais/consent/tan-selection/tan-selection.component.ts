import { Component, OnInit } from '@angular/core';
import {Account} from "../../../models/account";
import {Balance} from "../../../models/balance";
import {AccountConsent} from "../../../../../../online-banking-ui/src/app/model/aspsp/accountConsent";

@Component({
  selector: 'app-tan-selection',
  templateUrl: './tan-selection.component.html',
  styleUrls: ['./tan-selection.component.scss']
})
export class TanSelectionComponent implements OnInit {

  accounts: Account[];
  selectedAccounts = new Array<Account>();
  consent: AccountConsent;

  constructor() { }

  ngOnInit() {
  }

  private getAccounts() {
   let balance1 = new Balance();
  }

}
