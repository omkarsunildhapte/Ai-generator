import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [FormsModule, InputTextModule,SliderModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {

  value: number = 50;
  value_one: number = 40;
  tools_data: any = [
    {
      image: 'book.svg',
      text: 'Blog Tools',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'newspaper.svg',
      text: 'Social Media Tools',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'book.svg',
      text: 'YouTube Tools',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'newspaper.svg',
      text: 'Advertising Tools',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'book.svg',
      text: 'Writing Assistant',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'newspaper.svg',
      text: 'Website Content',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'book.svg',
      text: 'Email Tools',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'newspaper.svg',
      text: 'E-commerce Tools',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'book.svg',
      text: 'Copywriting Tools',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'newspaper.svg',
      text: 'Idea Generation',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'book.svg',
      text: 'Image Prompts',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'newspaper.svg',
      text: 'Re-purpose Content',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'book.svg',
      text: 'Education Tools',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'newspaper.svg',
      text: 'HR Tools',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'book.svg',
      text: 'Support',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'newspaper.svg',
      text: 'Sales',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'book.svg',
      text: 'Film Making Tools',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'newspaper.svg',
      text: 'Music Tools',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'book.svg',
      text: 'Extras',
      number: '11',
      arrow: 'arrow.svg',
    },
    {
      image: 'newspaper.svg',
      text: 'Sales',
      number: '11',
      arrow: 'arrow.svg',
    },
  ];
  click_data: any = [
    {
      image: 'book.svg',
      text: 'Branding Package',
    },
    {
      image: 'newspaper.svg',
      text: 'Complete Brand Content',
    },
    {
      image: 'book.svg',
      text: 'Copywriting Framework',
    },
    {
      image: 'newspaper.svg',
      text: 'Employee Handbook Generator',
    },
    {
      image: 'book.svg',
      text: 'LinkedIn Profile Builder',
    },
    {
      image: 'newspaper.svg',
      text: 'Homepage Copy',
    },
    {
      image: 'book.svg',
      text: 'SEO Optimized Blog Package',
    },
    {
      image: 'newspaper.svg',
      text: 'Sales Copywriting Package',
    },
    {
      image: 'book.svg',
      text: 'Social Media Posts',
    },
    {
      image: 'newspaper.svg',
      text: 'Video Marketing Script',
    },
    {
      image: 'book.svg',
      text: 'YouTube Branding',
    },
  ];
  account_data: any = [
    {
      image: 'newspaper.svg',
      text: 'Profile',
    },
    {
      image: 'book.svg',
      text: 'Subscription',
    },
    {
      image: 'newspaper.svg',
      text: 'Payments',
    },
    {
      image: 'book.svg',
      text: 'Tutorial Video',
    },
    {
      image: 'newspaper.svg',
      text: 'Settings',
    },
    {
      image: 'book.svg',
      text: 'Support',
    },
  ];


}
