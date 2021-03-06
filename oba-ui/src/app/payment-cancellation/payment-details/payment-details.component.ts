import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PaymentAuthorizeResponse} from "../../api/models/payment-authorize-response";
import {ShareDataService} from "../../common/services/share-data.service";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  public authResponse: PaymentAuthorizeResponse;
  private subscriptions: Subscription[] = [];

  constructor(private sharedService: ShareDataService) {
  }

  ngOnInit() {
    this.sharedService.currentData.subscribe(
      authResponse => this.authResponse = authResponse
    );
  }

}
