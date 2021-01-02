import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { DataService } from './../data/data.service';
import { UserSettings } from './../data/user-settings';


@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: 'Milton',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'notes...'
  };
  userSettings: UserSettings = { ...this.originalUserSettings };
  private readonly dataService: DataService;
  postError: boolean = false;
  postErrorMessage: string = '';
  subscriptionTypes: Observable<string[]>;
  singleModel: string = 'On';

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onHttpError(errorResponse: any): void {
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm): void {
    console.log('on submit: ', form.valid);
    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success: ', result),
        error => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Fix the above error';
    }
  }

  onBlur(field: NgModel): void {
    console.log('on blur: ', field.valid);
  }

}
