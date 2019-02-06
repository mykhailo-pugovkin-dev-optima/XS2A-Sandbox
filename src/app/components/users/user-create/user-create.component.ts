import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  id: string;
  user: User;

  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.setupUserFormControl();
  }

  setupUserFormControl(): void {
    this.userForm = this.formBuilder.group({
      scaUserData: this.formBuilder.array([
        this.initScaData()
      ]),
      accountAccesses: this.formBuilder.array([
        this.initAccountAccessData()
      ]),
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get formControl() {
    return this.userForm.controls;
  }

  initScaData() {
    return this.formBuilder.group({
      scaMethod: ['', Validators.required],
      methodValue: ['', Validators.required]
    })
  }

  initAccountAccessData() {
    return this.formBuilder.group({
      accessType: ['', Validators.required],
      iban: ['', Validators.required]
    })
  }

  onSubmit() {
    // this.userService.createUser(this.userForm.value)
    //   .subscribe(response => {
    //     this.router.navigateByUrl('/users');
    //   });
  }

}
