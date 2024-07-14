import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { PlatformService } from '../../service/platform.service';

@Component({
  selector: 'app-promote',
  standalone: true,
  imports: [DropdownModule,ButtonModule,EditorModule,FormsModule,ReactiveFormsModule],
  templateUrl: './promote.component.html',
  styleUrl: './promote.component.scss'
})
export class PromoteComponent {
  platformServies = inject(PlatformService);
  route = inject(ActivatedRoute);
  showAdvanced :boolean = true;
  promte:any;
  promtes:any
  promtesForm= new FormGroup({});
  ngOnInit() {
    this.route.queryParams.subscribe((res:any)=>{
      this.platformServies.getPrompts(res.id).subscribe((res:any)=>{
        if(res.status==200){
          this.promtes = res.res;
          this.promtes.question_list.forEach((promte:any) => {
            this.promtesForm.addControl(promte.id, new FormControl('',promte.required ? [Validators.required]:[]));
          });
        }
      })
    })
  }
  onSubmit(){
  }
}
