import { Component, inject, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [DropdownModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  userServices = inject(UserService);
  option: any[] = [];
  ngOnInit(): void {
    this.userServices.getLanguages().subscribe((res: any) => {
      if (res.status == 200) {
        this.option = res.res;
      }
    })
  }
}
