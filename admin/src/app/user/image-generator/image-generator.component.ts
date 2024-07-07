import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [TabMenuModule,InputTextModule,ButtonModule,DropdownModule],
  templateUrl: './image-generator.component.html',
  styleUrl: './image-generator.component.css'
})
export class ImageGeneratorComponent {

  activeItem: MenuItem | undefined;
  items: MenuItem[] = [
    { label: 'Image Generation' },
    { label: 'Gallery' },
  ];

  language: City[] | undefined = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  constructor() {
    this.activeItem = this.items[1]
  }
  onActiveItemChange(event: MenuItem) {
    debugger
    this.activeItem = event;
  }

}
