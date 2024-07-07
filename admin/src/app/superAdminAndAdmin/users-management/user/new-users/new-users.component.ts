import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { RolesService } from '../../../../service/roles.service';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-new-users',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputSwitchModule,
    ReactiveFormsModule,
    MultiSelectModule,
  ],
  templateUrl: './new-users.component.html',
  styleUrl: './new-users.component.scss',
})
export class NewUsersComponent implements OnInit {
  userExist: boolean = false;
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    account_status: new FormControl(true),
    role: new FormControl([], Validators.required),
    securepassword: new FormControl(true),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    locationName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  rolesList: any[] = [];
  rolesService = inject(RolesService);
  userService = inject(UserService);
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    forkJoin({
      countries: this.userService.getCountries(),
      roles: this.rolesService.findAllByUserId(),
    }).subscribe((response: any) => {
      this.countries = response.countries.countries;
      if (response.roles.status === 200) {
        this.rolesList = response.roles.res;
      }
    });
  }

  onSave() {
    if (this.userForm.valid) {  
      let rawValue = this.userForm.getRawValue();
      this.userService.create(rawValue).subscribe((res:any)=>{
        this.userForm.reset();
        Object.keys(this.userForm.controls).forEach(key => {
          const control = this.userForm.get(key);
          if (control) {
            control.clearValidators();
            control.updateValueAndValidity(); 
          }
        });
        this.notify.emit('');
        this.userExist =false;
      },(error)=>{
        console.error('Error fetching data:', error);
      })
    } else {
      console.log('Form is invalid');
    }
  }

  onCountryChange(): void {
    const countryCode = this.userForm.get('country')?.value;
    if (countryCode) {
      this.userService.getStates(countryCode).subscribe((response: any) => {
        this.states = response.res;
        this.cities = [];
      });
    }
  }

  onStateChange(): void {
    const countryCode = this.userForm.get('country')?.value;
    const stateCode = this.userForm.get('state')?.value;
    if (countryCode && stateCode) {
      this.userService
        .getCities(countryCode, stateCode)
        .subscribe((response: any) => {
          this.cities = response.res;
        });
    } else {
      alert('Plz select the counrty');
    }
  }
}
