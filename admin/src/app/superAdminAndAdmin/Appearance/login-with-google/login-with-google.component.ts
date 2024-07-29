import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-with-google',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-with-google.component.html',
  styleUrl: './login-with-google.component.scss',
})
export class LoginWithGoogleComponent {
  googleSetupForm = new FormGroup({
    enable_login_google: new FormControl(0),
    google_client_id: new FormControl(''),
    google_client_secret: new FormControl(''),
    google_callback_url: new FormControl(''),
    custom_script: new FormControl(''),
  });
  userService = inject(UserService);

  ngOnInit(): void {
    this.getGoogleSettings();
  }
  getGoogleSettings() {
    this.userService.getGoogleSettings().subscribe((res: any) => {
      if (res.status == 200) {
        this.googleSetupForm.patchValue(res.res)
      }
    })
  }

  onSubmit(): void {
    if (this.googleSetupForm.valid) {
      const body = this.googleSetupForm.getRawValue();
      this.userService.updateGoogleSettings(body).subscribe((res: any) => {
        if (res.status == 200) {
          this.getGoogleSettings();
        }
      })
    }
  }
}
