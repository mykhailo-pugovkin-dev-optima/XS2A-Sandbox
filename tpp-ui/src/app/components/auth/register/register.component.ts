import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {combineLatest} from "rxjs";
import JSZip from 'jszip';

import {AuthService} from "../../../services/auth.service";
import {CertGenerationService} from "../../../services/cert-generation.service";
import {InfoService} from "../../../commons/info/info.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public userForm: FormGroup;
    public certificateForm: FormGroup;
    public certificateFormValid: boolean = false;
    public certificateValue: any;

    public generateCertificate: boolean;
    public submitted: boolean;
    public errorMessage: string; //TODO: errors handling with error interceptor

    private generateZipFile(certBlob, keyBlob): Promise<any> {
        const zip = new JSZip();
        zip.file('certificate.pem', certBlob);
        zip.file('private.key', keyBlob);
        return zip.generateAsync({ type: 'blob' });
    }

    constructor(private service: AuthService,
                private certGenerationService: CertGenerationService,
                private infoService: InfoService,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.initializeRegisterForm();
    }

    getCertificateFormStatus(event) {
        this.certificateFormValid = event;
    }

    getCertificateValue(event) {
        this.certificateValue = event;
        console.log('value', this.certificateValue);
    }

    public onSubmit(): void {

   /*     if (this.userForm.valid && this.certificateFormValid) {

        }*/

   const branch = this.userForm.get('branch').value;
        console.log('certificate value', this.certificateValue);
        this.submitted = true;

        if (this.generateCertificate) {

            // combine observables
            combineLatest([
                this.service.register(this.userForm.value, branch),
                this.certGenerationService.generate(this.certificateValue)
            ]).subscribe((combinedData: any) => {

                // get cert generation params
                const encodedCert = combinedData[1].encodedCert;
                const privateKey = combinedData[1].privateKey;

                this.createZipUrl(encodedCert, privateKey).then(url =>
                    this.router.navigate(['/login'])
                        .then(() => {

                            this.infoService.openFeedback(`You have been successfully registered and your certificate generated.
                            The download will start automatically within the 2 seconds`);

                            setTimeout(() => {
                                this.downloadFile(url);
                            }, 2000, url)

                        })
                );
            });
        } else {
            this.service.register(this.userForm.value, branch)
                .subscribe(() => {
                    this.router.navigate(['/login'])
                        .then(() => {
                            this.infoService.openFeedback(`You have been successfully registered.`);
                        });
                    }, () => {
                        this.infoService.openFeedback('TPP with this login or email exists already', {
                            severity: 'error'
                        })
                });

        }
    }

    private initializeRegisterForm(): void {
        this.userForm = this.formBuilder.group({
            branch: ['', Validators.required],
            login: ['', Validators.required],
            email: ['', Validators.required],
            pin: ['', Validators.required]
        });
    }

    private createZipUrl(encodedCert: string, privateKey: string): Promise<string> {
        const blobCert = new Blob([encodedCert], {
            type: 'text/plain',
        });
        const blobKey = new Blob([privateKey], {
            type: 'text/plain',
        });
        return this.generateZipFile(blobCert, blobKey).then(
            zip => {
                return window.URL.createObjectURL(zip);
            }
        );
    }

    private downloadFile(url: string) {
        const element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', 'psu_cert.zip');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

/*    // user form controls
    get login() {
        return this.userForm.get('login');
    }

    get branch() {
        return this.userForm.get('branch');
    }

    get email() {
        return this.userForm.get('email');
    }

    get pin() {
        return this.userForm.get('pin');
    }

    // certificate generation form controls
    get authorizationNumber(): FormControl {
        return <FormControl>this.certificateForm.get('authorizationNumber');
    }

    get organizationName(): FormControl {
        return <FormControl>this.certificateForm.get('organizationName');
    }

    get domainComponent(): FormControl {
        return <FormControl>this.certificateForm.get('domainComponent');
    }

    get validity(): FormControl {
        return <FormControl>this.certificateForm.get('validity');
    }

    get roles(): FormArray {
        return <FormArray>this.certificateForm.get('roles');
    }*/
}
