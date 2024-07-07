import { Component, inject } from '@angular/core';
import {  FormControl,  FormGroup,  FormsModule,  ReactiveFormsModule,  Validators,} from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router, RouterLink } from '@angular/router';
import { CommentLogComponent } from '../../user/comment-log/comment-log.component';
import { InputOtpModule } from 'primeng/inputotp';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RouterLink,CommentLogComponent,InputOtpModule,ToastModule, MessagesModule, MessageModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  providers: [MessageService]
})
export class ForgetPasswordComponent {
  userService = inject(UserService);
  messageService = inject(MessageService);
  router = inject(Router);
  otpVerification: boolean = false;
  otpNumber = new FormControl('', Validators.required);
  otpNumberSend: boolean = false;
  forgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  onForgetPasswordSubmit() {
    if (this.forgetPasswordForm.valid) {
      const rawValue: any = this.forgetPasswordForm.getRawValue();
      this.userService.forgotPassword(rawValue.email).subscribe(
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
    } else {
      this.forgetPasswordForm.markAsTouched();
    }
  }

  onOtpSubmit() {
    if (this.otpNumber.valid) {
      const otp = this.otpNumber.value;
      const body ={
        email: this.forgetPasswordForm.value.email,
        newPassword:this.forgetPasswordForm.value.password,
        otp: otp
      }
      this.userService.resetPassword(body).subscribe(
        (res: any) => {
          if (res.status === 200) {
            debugger
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.res.message });
            this.router.navigate(['/login']);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.error });
          }
         
        },
        (error: any) => {}
      );
    }
  }
  
  notifyResendNotReceived(): void {
    if (this.forgetPasswordForm.valid) {
      const email = this.forgetPasswordForm.value.email;
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

}
