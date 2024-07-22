import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { InputOtpModule } from 'primeng/inputotp';
import { CommentLogComponent } from '../comment-log/comment-log.component';
import { UserService } from '../../service/user.service';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommentLogComponent, ReactiveFormsModule, InputOtpModule, RouterLink, ToastModule, MessagesModule, MessageModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  userService = inject(UserService);
  messageService = inject(MessageService);
  router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  otpNumber = new FormControl('', Validators.required);
  otpNumberSend: boolean = false;
  ngOnInit(): void { }

  login(): void {
    if (this.loginForm.valid) {
      const rawValue = this.loginForm.getRawValue();
      this.userService.login(rawValue).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.otpNumberSend = true;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.res.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.error });
          }
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred' });
        }
      );
    }
  }

  notifyResendNotReceived(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      this.userService.regenerateOtp(email).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.res.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.error });
          }
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please provide a valid email address' });
    }
  }

  verifyOtp(): void {
    if (this.otpNumber.valid) {
      const body = {
        email: this.loginForm.value.email,
        otp: this.otpNumber.value
      };
      this.userService.verifyOtp(body).subscribe(
        (res: any) => {
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.res.data));
            localStorage.setItem('token', res.res.token);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.res.message });
            const checks  =  res.res.data.role.some((e:any)=>e=='Admin')
            debugger
            this.router.navigate([ checks ?'/main': 'user']);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.error });
          }
        },  
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred' });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter a valid OTP' });
    }
  }
}
