import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { Router } from '@angular/router';
import { PlatformService } from '../../service/platform.service';

@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [TabMenuModule,InputTextModule,ButtonModule,DropdownModule,ReactiveFormsModule,ImageModule],
  templateUrl: './image-generator.component.html',
  styleUrl: './image-generator.component.css'
})
export class ImageGeneratorComponent implements OnInit {
  platformService=inject(PlatformService)
  noOfImagesOptions: { name: string, value: number }[]=[
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 }
  ];
  imageSizeOptions: { name: string, value: string }[]= [
    { name: '256x256', value: '256x256' },
    { name: '512x512', value: '512x512' },
    { name: '1024x1024', value: '1024x1024' },
    { name: '128x128', value: '128x128' },
    { name: '192x192', value: '192x192' },
    { name: '384x384', value: '384x384' },
    { name: '768x768', value: '768x768' },
    { name: '1536x1536', value: '1536x1536' }
  ];
  styleOptions: { name: string, value: string }[]=  [
    { name: 'Modern', value: 'modern' },
    { name: 'Classic', value: 'classic' },
    { name: 'Vintage', value: 'vintage' },
    { name: 'Abstract', value: 'abstract' }
  ];
  items: MenuItem[] = [
    { label: 'Image Generation' },
    { label: 'Gallery' },
  ];
  imageGallery: any[] = [];
  result:any;
form:FormGroup=new FormGroup({
  question:new FormControl('',Validators.required),
  noOfImages:new FormControl(null),
  imageSize:new FormControl(null),
  style:new FormControl(null)
});
  router= inject(Router);
  activeItem: MenuItem | undefined;
  
  ngOnInit(): void {
    this.router.url;
    if (this.router.url.includes('gallery')){
      this.activeItem = this.items[1];
    } else if (this.router.url.includes('imagegenerate')){
      this.activeItem = this.items[0];
    }
    
  }
  
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.platformService.getImages(this.form.getRawValue()).subscribe((res)=>{
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
