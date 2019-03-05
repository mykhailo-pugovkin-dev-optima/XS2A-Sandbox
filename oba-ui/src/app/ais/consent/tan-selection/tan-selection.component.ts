import { Component, OnInit } from '@angular/core';
import {Account} from "../../../models/account";
import {Balance} from "../../../models/balance";
import BalanceTypeEnum = Balance.BalanceTypeEnum;
import {Amount} from "../../../models/amount";

@Component({
  selector: 'app-tan-selection',
  templateUrl: './tan-selection.component.html',
  styleUrls: ['./tan-selection.component.scss']
})
export class TanSelectionComponent implements OnInit {

  accounts: Account[] = [];
  consentValidTo = new Date('2019-05-01');

  constructor() { }

  ngOnInit() {
    this.getAccounts();
  }

  private getAccounts() {
    let amount1:Amount = {amount: '20', currency: 'EUR'};
    let balance1:Balance = {balanceAmount: amount1, balanceType: BalanceTypeEnum.AVAILABLE};
    let account1:Account = {
      id: '1234576',
      iban: 'DE2783782783283782',
      bban: '',
      currency: 'EUR',
      name: 'My example account',
      accountType: 'Example type',
      balances: [balance1],
      _links: {
        viewBalances: 'link2balance',
        viewTransactions: 'link2transactions'
      }
    };

    let amount2:Amount = {amount: '400', currency: 'EUR'};
    let balance2:Balance = {balanceAmount: amount2, balanceType: BalanceTypeEnum.AVAILABLE};
    let account2:Account = {
      id: '9866535',
      iban: 'DE9783782783284646',
      bban: '',
      currency: 'EUR',
      name: 'My second example account',
      accountType: 'Example type',
      balances: [balance2],
      _links: {
        viewBalances: 'link2balance',
        viewTransactions: 'link2transactions'
      }
    };

    this.accounts.push(account1);
    this.accounts.push(account2);
  }

  private getConsent() {

  }

}
