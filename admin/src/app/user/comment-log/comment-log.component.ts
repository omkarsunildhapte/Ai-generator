import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-log',
  standalone: true,
  imports: [],
  templateUrl: './comment-log.component.html',
  styleUrl: './comment-log.component.css'
})
export class CommentLogComponent {
  cards = [
    { name: 'Rebecca Moyes', designation: 'CTO', content: '“Not only did it save me time, but it also helped me produce content that was more engaging and effective than what I had been creating on my own.”' },
    { name: 'Lisa Singh', designation: 'Writer', content: '“Not only did it save me time, but it also helped me produce content that was more engaging and effective than what I had been creating on my own.”' },
    { name: 'Selma Hayat', designation: 'Project Manager', content: '“Not only did it save me time, but it also helped me produce content that was more engaging and effective than what I had been creating on my own.”' },
    { name: 'Akshay Sharma', designation: 'CEO', content: '“Not only did it save me time, but it also helped me produce content that was more engaging and effective than what I had been creating on my own.”' }
  ];
}
