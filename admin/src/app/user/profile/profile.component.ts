import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { PlatformService } from '../../service/platform.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userServices = inject(UserService);
  platformService = inject(PlatformService);
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  fb= inject(FormBuilder)
  passwordForm!:FormGroup
  defaultLanguage = new FormControl('');
  option: any[] = [];
  parsedUser: any;
  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        repeatPassword: new FormControl('', Validators.required),
      },
      { validator: this.passwordMatchValidator }
    );

    this.userServices.getLanguages().subscribe((res: any) => {
      if (res.status == 200) {
        this.option = res.res;
      }
    });
    let user = localStorage.getItem('user');
    if (user) {
      this.parsedUser = JSON.parse(user);
      this.profileForm.patchValue({
        firstName: this.parsedUser.name,
        lastName: this.parsedUser.surname,
        email: this.parsedUser.email,
      });
      this.defaultLanguage.setValue(this.parsedUser.default_language)
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('repeatPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  saveProfile(): void {
    const rawValue = this.profileForm.getRawValue();
    if (this.profileForm.valid) {
      const body = {
        email: rawValue.email,
        firstName: rawValue.firstName,
        lastName: rawValue.lastName,
        phoneNumber: this.parsedUser.phone_number,
        activeStatus: 1
      };
      this.platformService.resetUpdateUser(body).subscribe(
        (res: any) => {
          if (res.status === 200) {
            // Handle successful response, e.g., show a success message
            console.log('Profile updated successfully');
          }
        },
        (error: any) => {
          // Handle error response, e.g., show an error message
          console.error('Error updating profile:', error);
        }
      );
    }
  }
  
  changePassword(): void {
    if (this.passwordForm.valid) {
      this.platformService.resetUpdatePassword(this.passwordForm.value.newPassword).subscribe(
        (res: any) => {
          if (res.status === 200) {
            // Handle successful response, e.g., show a success message
            console.log('Password changed successfully');
            this.passwordForm.reset();
          }
        },
        (error: any) => {
          // Handle error response, e.g., show an error message
          console.error('Error changing password:', error);
        }
      );
    }
  }
  
  saveLanguage(): void {
    if (this.defaultLanguage.valid) {
      this.platformService.updateDefaultLanguage(this.defaultLanguage.value).subscribe(
        (res: any) => {
          if (res.status === 200) {
            console.log('Default language updated successfully');
          }
        },
        (error: any) => {
          console.error('Error updating default language:', error);
        }
      );
    }
  }
  
}
