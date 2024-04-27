import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommentLogComponent } from '../comment-log/comment-log.component';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-otp-screen',
  standalone: true,
  imports: [CommonModule, CommentLogComponent,InputTextModule],
  templateUrl: './otp-screen.component.html',
  styleUrl: './otp-screen.component.css'
})
export class OtpScreenComponent {

  @ViewChild('input2') input2!: ElementRef<HTMLInputElement>;
  @ViewChild('input3') input3!: ElementRef<HTMLInputElement>;
  @ViewChild('input4') input4!: ElementRef<HTMLInputElement>;
  @ViewChild('input5') input5!: ElementRef<HTMLInputElement>;
  @Output() codeResendNotReceived = new EventEmitter<boolean>();
  
  constructor(private router:Router) {
    this.input2 = new ElementRef(document.createElement('input'));
    this.input3 = new ElementRef(document.createElement('input'));
    this.input4 = new ElementRef(document.createElement('input'));
    this.input5 = new ElementRef(document.createElement('input'));
  }
  
  focusNext(nextInput: HTMLInputElement) {
    nextInput.focus();
  }
  checkStatus(){
    this.router.navigate(['/library'])
  }
  notifyResendNotReceived() {
    this.codeResendNotReceived.emit(false);
  }

}
