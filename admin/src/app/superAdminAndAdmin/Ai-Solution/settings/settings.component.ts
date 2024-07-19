import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AISolutionService } from '../../../service/ai-solution.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  userServies = inject(UserService);
  aISolutionService = inject(AISolutionService);
  persona:any[]=[]
  openAIForm = new FormGroup({
    defaultEngineKey: new FormControl('', Validators.required),
    defaultEngine: new FormControl('', Validators.required),
    defaultEngineMaxToken: new FormControl('', Validators.required),
  });

  bingForm = new FormGroup({
    bingSearchKey: new FormControl(''),
    bingSearchStatus: new FormControl(false)
  });

  chatForm = new FormGroup ({
    chatModel: new FormControl(''),
    chatModelPersona: new FormControl('')
  })
  ngOnInit(): void {
    this.getSettings();
    this.aISolutionService.getAllPersonas().subscribe((res:any)=>{
      if(res.status==200){
        this.persona = res.res;
      }
    })
  }
  getSettings(){
    this.userServies.getSetting().subscribe((res:any)=>{
      if (res.status==200){
        this.openAIForm.patchValue({
          defaultEngineKey:res.res.default_engine_key,
          defaultEngine:res.res.default_engine,
          defaultEngineMaxToken:res.res.default_engine_max_token
        });
        this.bingForm.patchValue({
          bingSearchKey:res.res.bing_search_key,
          bingSearchStatus : res.res.bing_search_status==1 ? true: false
        });
        this.chatForm.patchValue({
          chatModel:res.res.chat_model,
          chatModelPersona:res.res.chat_model_persona
        })
      }
    })
  }
  openAIUpdate() {
    const rawValue = this.openAIForm.getRawValue();
    this.userServies.openAiKeySettingsUpdate(rawValue).subscribe((res: any) => {
      if (res.status == 200) {
        alert('update Successfully')
        this.getSettings()
      }
    })
  }

  bingSubmit() {
    const rawValue = this.bingForm.getRawValue();
    this.userServies.bingSeachKeySettingsUpdate(rawValue).subscribe((res: any) => {
      if (res.status == 200) {
        alert('update Successfully')
        this.getSettings()
      }
    })
  }

  chatSubmit() {
    const rawValue = this.chatForm.getRawValue();
    this.userServies.chatSettingsUpdate(rawValue).subscribe((res: any) => {
      if (res.status == 200) {
        alert('update Successfully')
        this.getSettings()
      }
    })
  }
}
