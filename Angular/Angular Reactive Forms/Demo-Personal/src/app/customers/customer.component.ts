import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Customer } from './customer';

function ratingRange(min:number, max: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (control.value !== null && (isNaN(control.value) || control.value < min || control.value > max)) {
      return { 'range': true };
    }
    return null;
  }
}

function emailMatcher(control: AbstractControl): {[key: string]: boolean} | null {
  const emailControl = control.get('email');
  const confirmEmailControl = control.get('confirmEmail');

  if (emailControl.pristine || confirmEmailControl.pristine) {
    return null;
  }

  if (emailControl.value == confirmEmailControl.value) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  customer = new Customer();
  private readonly formBuilder: FormBuilder;
  emailMessage: string;
  private validationMessage: {[key:string]: string} = {
    required: 'Please enter your email address',
    email: 'Please enter  valid email address'
  };


  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [ Validators.required, Validators.minLength(3) ] ],
      // lastName: {value: 'n/a', disabled: true},
      lastName: ['', [ Validators.required, Validators.maxLength(50) ] ],
      emailGroup: this.formBuilder.group({
        email: ['', [ Validators.required, Validators.email ] ],
        confirmEmail: ['', [Validators.required]],
      }, {validator: emailMatcher }),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true,
      addresses: this.formBuilder.array([ this.buildAddress() ])
    });
    // this.customerForm = new FormGroup({
      // firstName: new FormControl(),
      // lastName: new FormControl(),
      // email: new FormControl(),
      // sendCatalog: new FormControl(true)
    // });

    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      () => this.setMessage(emailControl)
    )
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }

  buildAddress(): FormGroup {
    return this.formBuilder.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    })
  }

  setNotification(type: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (type == 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  setMessage(control: AbstractControl): void {
    this.emailMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.emailMessage = Object.keys(control.errors).map(
        key => this.validationMessage[key]).join(' ');
    }
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  populateTestDate(): void {
    this.customerForm.patchValue({
      firstName: "Jack",
      lastName: "Russel"
    });
  }

}
