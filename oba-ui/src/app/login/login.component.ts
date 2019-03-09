import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {PSUAISService} from "../../../services/psuais.service";
import {RoutingPath} from "../common/models/routing-path.model";

@Component({
    selector: 'ais-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    returnUrl: string;
    error: string;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private psuAisService: PSUAISService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            login: ['', Validators.required],
            pin: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {

        //check while authenticate and make post for login
        this.loading = true;
        this.psuAisService.loginUsingPOST((this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([`./${RoutingPath.BANK_OFFERED}`]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }));
    }

    //public profession = 'l homme fort';
    //public test = 'Popol' + this.profession;
    //public test1 = `Popol${this.profession}`;

}
