import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommentLogComponent } from '../comment-log/comment-log.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, CommentLogComponent,InputTextModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
