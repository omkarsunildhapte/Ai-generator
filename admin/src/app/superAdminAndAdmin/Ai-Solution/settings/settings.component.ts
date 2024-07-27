import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../service/user.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AISolutionService } from '../../../service/ai-solution.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  aISolutionService = inject(AISolutionService);
  persona: any[] = [];
  id: number = 0;
  openAIForm = new FormGroup({
    defaultEngineKey: new FormControl('', Validators.required),
    defaultEngine: new FormControl('', Validators.required),
    defaultEngineMaxToken: new FormControl('', Validators.required),
    bingSearchKey: new FormControl(''),
    bingSearchStatus: new FormControl(false),
    chatModel: new FormControl(''),
    chatModelPersona: new FormControl(''),
  });

  ngOnInit(): void {
    this.getSettings();
    this.aISolutionService.getAllPersonas().subscribe((res: any) => {
      if (res.status == 200) {
        this.persona = res.res;
      }
    });
  }

  getSettings() {
    this.aISolutionService.getPromptsSettings().subscribe((res: any) => {
      if (res.status == 200 && res.res) {
        this.id = res.res.id;
        this.openAIForm.patchValue({
          defaultEngineKey: res.res.default_engine_key,
          defaultEngine: res.res.default_engine,
          defaultEngineMaxToken: res.res.default_engine_max_token,
          bingSearchKey: res.res.bing_search_key,
          bingSearchStatus: res.res.bing_search_status == 1 ? true : false,
          chatModel: res.res.chat_model,
          chatModelPersona: res.res.chat_model_persona,
        });
      }
    });
  }

  createOrUpdateSetting() {
    const rawValue = this.openAIForm.getRawValue();
    const body = {
      id: this.id, // Ensure 'id' is defined or retrieved from your logic
      default_engine_key: rawValue.defaultEngineKey,
      default_engine: rawValue.defaultEngine,
      default_engine_max_token: rawValue.defaultEngineMaxToken,
      bing_search_key: rawValue.bingSearchKey,
      bing_search_status: rawValue.bingSearchStatus ? 1 : 0,
      chat_model: rawValue.chatModel,
      chat_model_persona: rawValue.chatModelPersona,
    };

    this.aISolutionService.createOrUpdateSetting(body).subscribe((res: any) => {
      if (res.status == 200) {
        alert('Update Successful');
        this.getSettings(); // Refresh settings after update
      }
    });
  }
}
