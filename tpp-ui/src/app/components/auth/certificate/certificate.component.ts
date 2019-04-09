import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-certificate',
    templateUrl: './certificate.component.html',
    styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {


    @Output() certificateFormStatus = new EventEmitter();
    @Output() certificateValue = new EventEmitter();

    certificateFormGroup: FormGroup;
    public rolesOptions:  Array<String> = ['PIISP', 'PISP', 'AISP'];
    rolesOptionsError: Boolean = true;
    selectedTests = [];

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.initializeCertificateGeneratorForm();
        this.certificateFormGroup.valid
    }

    private initializeCertificateGeneratorForm(): void {
        this.certificateFormGroup = this.formBuilder.group({
            authorizationNumber: ['ID12345', Validators.required],
            organizationName: ['Awesome TPP', Validators.required],
            countryName: ['Germany', Validators.required],
            domainComponent: ['awesome-tpp.de', Validators.required],
            localityName: ['Nuremberg', Validators.required],
            organizationUnit: ['IT department', Validators.required],
            stateOrProvinceName: ['Bayern', Validators.required],
            validity: ['365',
                [
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),
                ]
            ],
            rolesOptions: this.addCheckboxControls(),
        });
    }
    addCheckboxControls() {
        const arr = this.rolesOptions.map(() => {
            return this.formBuilder.control(false);
        });
        return this.formBuilder.array(arr);
    }

    get checkboxArray() {
        return <FormArray>this.certificateFormGroup.get('rolesOptions');
    }

    getSelectedCheckboxValue() {
        this.selectedTests = [];
        this.checkboxArray.controls.forEach((control, i) => {
            if (control.value) {
                this.selectedTests.push(this.rolesOptions[i]);
            }
        });
        this.rolesOptionsError =  this.selectedTests.length > 0 ? false : true;
    }

    onChange() {
        const status = this.certificateFormGroup.valid && !this.rolesOptionsError;
        console.log(this.certificateFormGroup.value, status);

        if(status) {
            console.log(this.certificateFormGroup.get('rolesOptions'));
             this.certificateValue.emit(this.certificateFormGroup.value);
        }
        this.certificateFormStatus.emit(status);

    }
}
