import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppearanceService } from '../../../service/appearance.service';
interface ColorSetting {
  key: string;
  value: string;
}
interface ColorResponse {
  primary_color: string;
  secondary_color: string;
  success_color: string;
  warning_color: string;
  danger_color: string;
  dark_color: string;
}

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent implements OnInit {
  appearanceService= inject(AppearanceService)
  colorSettings: ColorSetting[] = [
    { key: 'primary_color', value: '#FF5733' },
    { key: 'secondary_color', value: '#3498db' },
    { key: 'success_color', value: '#27ae60' },
    { key: 'warning_color', value: '#f39c12' },
    { key: 'danger_color', value: '#e74c3c' },
    { key: 'dark_color', value: '#34495e' }
  ];
  id:number=0;
  mode:number=0;

  ngOnInit(): void {
    this.fetchColors(); 
  }

  fetchColors(): void {
    this.appearanceService.getColors().subscribe(
      (res: any) => {
        if(res.status){
          this.id = res.res.id;
          this.mode = res.res.mode;
          this.updateColorSettings(res.res);
        }
      },
      (error: any) => {
        console.error('Error fetching colors:', error);
      }
    );
  }

  updateColorSettings(colors: any): void {
    this.colorSettings.forEach(color => {
      if (colors[color.key]) {
        color.value = colors[color.key];
      }
    });
  }

  save(): void {
    let updatedColors = this.colorSettings.reduce((acc, color) => {
      acc[color.key as keyof ColorResponse] = color.value;
      return acc;
    }, {} as ColorResponse);
    // @ts-ignore
    updatedColors.id = this.id;
    // @ts-ignore
    updatedColors.mode = this.mode;
    this.appearanceService.updateColor(updatedColors).subscribe(
      (res: any) => {
        console.log('Colors updated successfully:', res);
      },
      (error: any) => {
        console.error('Error updating colors:', error);
      }
    );
  }

  getColorLabel(key: string): string {
    switch (key) {
      case 'primary_color': return 'Primary Color';
      case 'secondary_color': return 'Secondary Color';
      case 'success_color': return 'Success Color';
      case 'warning_color': return 'Warning Color';
      case 'danger_color': return 'Danger Color';
      case 'dark_color': return 'Dark Color';
      default: return '';
    }
  }
}
