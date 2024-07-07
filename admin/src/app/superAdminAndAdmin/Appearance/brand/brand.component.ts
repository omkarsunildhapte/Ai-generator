import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppearanceService } from '../../../service/appearance.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss',
})
export class BrandComponent implements OnInit {
  appearanceService = inject(AppearanceService);
  userService = inject(UserService);
  brandForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    slogan: new FormControl('', Validators.required),
    logo: new FormControl(null, Validators.required),
    background: new FormControl(null, Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    facebook: new FormControl(''),
    linkedin: new FormControl(''),
    instagram: new FormControl(''),
    whatsapp: new FormControl(''),
    youtube: new FormControl(''),
    google: new FormControl(''),
    tiktok: new FormControl(''),
    xapp: new FormControl(''),
    default_language: new FormControl('',Validators.required),
  });
  languages: any[] = [];

  ngOnInit(): void {
    this.appearanceService.getBranding().subscribe((res: any) => {
      if (res.status == 200) {
        const data = res.res;
        this.brandForm.patchValue({
          id:data.id,
          title: data.title,
          slogan: data.slogan,
          logo: data.logo,
          background: data.background,
          email: data.email,
          address: data.address,
          phone: data.phone,
          facebook: data.facebook,
          instagram: data.instagram,
          google: data.google,
          linkedin: data.linkedin,
          youtube: data.youtube,
          tiktok: data.tiktok,
          xapp: data.xapp,
          whatsapp: data.whatsapp,
          default_language: data.default_language,
        });
      }
    });
    this.userService.getLanguages().subscribe((res: any) => {
      if (res.status == 200) {
        this.languages = res.res;
      }
    });
  }

  onSubmit() {
    if (this.brandForm.valid) {
      const rawValue = this.brandForm.getRawValue();
      this.appearanceService.updateBranding(rawValue).subscribe((res:any)=>{
        if(res.status==200){

        }
      });
    }
  }

  handleFileInput(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file.size > 1024 * 1024) {
      alert('File size exceeds 1MB limit. Please choose a smaller file.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.brandForm.get(fieldName)?.patchValue({
        file: file.name,
        base64String: base64String
      });
    };
  
    reader.readAsDataURL(file);
  }
  

  getValue(fieldName: string,keyname:string){
   return this.brandForm.get(fieldName)?.value ? this.brandForm.get(fieldName)?.value[keyname] : null; 
  }
}
