import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommentLogComponent } from '../comment-log/comment-log.component';
import { OtpScreenComponent } from '../otp-screen/otp-screen.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CommentLogComponent, OtpScreenComponent,InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showOtp: boolean = false
  handleCodeResendNotReceived(event: boolean) {
    this.showOtp = event
  }
}
