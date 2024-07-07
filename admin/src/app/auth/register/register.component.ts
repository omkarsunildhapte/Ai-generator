import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommentLogComponent } from '../../user/comment-log/comment-log.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommentLogComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  userService = inject(UserService);
  isSubmit:boolean=false;
  countries:any[]=[];
  states:any[]=[];
  cities:any[]=[];
  router=inject(Router)
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
    locationName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    county: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5,10}$')])
  }, { validators: this.mustMatch('password', 'confirmPassword') });

  get f() {
    return this.signupForm.controls;
  }
  
  ngOnInit(): void {
    this.userService.getCountries().subscribe((res:any)=>{
      if(res.status){
        this.countries =res.res;
      }
    })
  }

  mustMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const formGroupInstance = formGroup as FormGroup;
      const passControl = formGroupInstance.controls[password];
      const confirmPassControl = formGroupInstance.controls[confirmPassword];
      if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
        return null;
      }
      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        confirmPassControl.setErrors(null);
        return null;
      }
    };
  }

  onCountryChange(): void {
    this.signupForm.get('state')?.setValue('');
    this.signupForm.get('city')?.setValue('');
    const countryCode = this.signupForm.get('county')?.value;
    if (countryCode) {
      this.userService.getStates(countryCode).subscribe((response: any) => {
        this.states = response.res;
        this.cities = [];
      });
    }
  }

  onStateChange(): void {
    const countryCode = this.signupForm.get('county')?.value;
    const stateCode = this.signupForm.get('state')?.value;
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

  onSubmit() {
    this.isSubmit=true;
    if (this.signupForm.valid) {
      const rawValue:any = this.signupForm.getRawValue();
      this.userService.register(rawValue).subscribe((res:any)=>{
        this.router.navigate(['/login']);
        this.isSubmit=false;
      },(error:any)=>{
      })
    } else{
      this.signupForm.markAllAsTouched();
    }
  }
}
