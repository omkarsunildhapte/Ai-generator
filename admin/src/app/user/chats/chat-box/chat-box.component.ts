import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [ButtonModule,InputGroupModule,InputGroupAddonModule],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {

}
