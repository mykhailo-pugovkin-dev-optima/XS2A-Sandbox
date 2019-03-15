import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AisService} from "../common/services/ais.service";
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
    redirectId: string;
    authorisationId: string;
    encryptedConsentId: string;
    consentCookie: string;
    header = new HttpHeaders();

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private cookieService: CookieService,
                private aisService: AisService) {
    }

    ngOnInit() {
        this.getParams();

        this.loginForm = this.formBuilder.group({
            login: ['', Validators.required],
            pin: ['', Validators.required]
        });
    }

    onSubmit() {
        this.loading = true;
        this.aisService.aisAuth({encryptedConsentId: this.encryptedConsentId, redirectId: this.redirectId})
          .subscribe(result => {
            console.log(result);
            this.consentCookie = this.cookieService.get('CONSENT');
            console.log(this.consentCookie);

            this.aisService.loginUsingAuthorizationId({
              login: "anton.brueckner",
              pin: "12345",
              encryptedConsentId: this.encryptedConsentId,
              authorisationId: this.redirectId
            }).subscribe(login => {
                console.log(login);
            });
          });

        // this.psuAisService.loginUsingAuthorizationId({
        //     ...this.loginForm.value,
        //     encryptedConsentId: this.encryptedConsentId,
        //     authorisationId: this.authorisationId,
        //     headers: this.header
        // })
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([`./${RoutingPath.BANK_OFFERED}`]);
        //         },
        //         error => {
        //             this.error = error;
        //             this.loading = false;
        //         });
    }

    private getParams () {
      this.route.queryParamMap.subscribe(queryParams => {
        this.encryptedConsentId = queryParams.get("encryptedConsentId")
        this.redirectId = queryParams.get("redirectId")
      });
    }
}
