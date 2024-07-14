import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { PlatformService } from '../../service/platform.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [FormsModule, InputTextModule, SliderModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent implements OnInit {
  platformServies = inject(PlatformService);
  tools_data: any[] = [];
  allPromts: any[] = [];
  filterPromts: any[] = [];
  filterValue:number |undefined=undefined;
  router = inject(Router)
  ngOnInit(): void {
    this.platformServies.getUserCategories().subscribe((res: any) => {
      if (res.status == 200) {
        this.tools_data = res.res;
        this.allPromts = this.tools_data.flatMap((e) =>
          e.categoryPrompts.map((main: any) => ({
            name: main.name,
            description: main.description,
            id: main.id,
            catID: e.id,
            catName: e.name,
            fav:false
          }))
        );
        this.filterData();
      }
    });
  }

  filterData(filterId?: number) {
    this.filterValue = filterId !==null ? filterId : undefined;
    this.filterPromts = filterId
      ? this.allPromts.filter((e) => e.catID == filterId)
      : this.allPromts;
  }
  getRouter(value:any){
    const queryParams = {
      id: value.id
    };
    this.router.navigate(['/user/prompts'], { queryParams });
  }
}
