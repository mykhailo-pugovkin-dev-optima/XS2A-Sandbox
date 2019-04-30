import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountComponent} from './account.component';
import {AccountService} from "../../services/account.service";
import "rxjs-compat/add/observable/from";
import {Account, AccountStatus, AccountType, UsageType} from "../../models/account.model";
import "rxjs-compat/add/observable/of";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {from, Observable} from "rxjs";

fdescribe('AccountComponent', () => {
    let component: AccountComponent;
    let fixture: ComponentFixture<AccountComponent>;
    let accountTestBedService: AccountService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule
            ],
            declarations: [AccountComponent],
            providers: [AccountService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountComponent);
        component = fixture.componentInstance;
        accountTestBedService = TestBed.get(AccountService);
    });

    afterEach(() => {
        accountTestBedService = null;
        component = null;
    });

    it('should create account component', () => {
        expect(component).toBeTruthy();
    });

    it('should call getAccount on ngOnInit', () => {
        let getAccountSpy = spyOn(accountTestBedService, 'getAccount').and.callThrough();

        component.ngOnInit();

        expect(getAccountSpy).toHaveBeenCalled();
    });

    it('should assign account after server call', () => {
        let mockAccount: Account = {
            id: 'XXXXXX',
            iban: 'DE35653635635663',
            bban: 'BBBAN',
            pan: 'pan',
            maskedPan: 'maskedPan',
            currency: 'EUR',
            msisdn: 'MSISDN',
            name: 'Pupkin',
            product: 'Deposit',
            accountType: AccountType.CASH,
            accountStatus: AccountStatus.ENABLED,
            bic: 'BIChgdgd',
            usageType: UsageType.PRIV,
            details: '',
            linkedAccounts: '',
            balances: []
        };

        spyOn(accountTestBedService, 'getAccount').and.returnValue(Observable.of(mockAccount));
        component.getAccount();
        expect(component.account).not.toBeUndefined();
    })
});
