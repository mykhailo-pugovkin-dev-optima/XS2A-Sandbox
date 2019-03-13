import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {RoutingPath} from "../common/models/routing-path.model";
import {AisService} from "../common/services/ais.service";
import {URL_PARAMS_PROVIDER} from "../common/constants/constants";
import {HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
    selector: 'ais-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    error: string;
    authorisationId: string;
    encryptedConsentId: string;
    consentCookie: string;
    header = new HttpHeaders();

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private cookieService: CookieService,
                private psuAisService: AisService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            login: ['', Validators.required],
            pin: ['', Validators.required]
        });
        this.consentCookie = this.cookieService.get('CONSENT');
        const IsCookieExists: boolean = this.cookieService.check('bla');
        console.log(IsCookieExists);
        // this.header.append("Cookie", this.consentCookie);
    }

    onSubmit() {
        this.loading = true;
        this.psuAisService.loginUsingAuthorizationId({
            ...this.loginForm.value,
            encryptedConsentId: this.encryptedConsentId,
            authorisationId: this.authorisationId,
            headers: this.header
        })
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([`./${RoutingPath.BANK_OFFERED}`]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
