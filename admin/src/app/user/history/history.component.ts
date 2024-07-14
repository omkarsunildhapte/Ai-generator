import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TabMenuModule } from 'primeng/tabmenu';
import { SpeedDialModule } from 'primeng/speeddial';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [TabMenuModule, TableModule, TagModule,SpeedDialModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  activeItem: MenuItem | undefined;
  items: MenuItem[] = [
    { label: 'History' },
    { label: 'Content Package History' },
  ];
actionItems = [
    {
        icon: 'pi pi-pencil',
        command: () => {
            // this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        }
    },
    {
        icon: 'pi pi-refresh',
        command: () => {
            // this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
    },
    {
        icon: 'pi pi-trash',
        command: () => {
            // this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
    },
    {
        icon: 'pi pi-upload',
        routerLink: ['/fileupload']
    },
    {
        icon: 'pi pi-external-link',
        target: '_blank',
        url: 'http://angular.io'
    }
];

  products!: Product[];
  constructor() {
    this.activeItem = this.items[1]
    this.getProductsMini().then((data) => {
      this.products = data;
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Blog Tools':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'Video Description':
        return 'danger';
      default:
        return 'unknown';
    }
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  }
  getProductsData() {
    return [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'Blog Tools',
        rating: 5
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'Video Description',
        rating: 4
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'Video Description',
        rating: 3
      },
      {
        id: '1003',
        code: '244wgerg2',
        name: 'Blue T-Shirt',
        description: 'Product Description',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Clothing',
        quantity: 25,
        inventoryStatus: 'Blog Tools',
        rating: 5
      },
      {
        id: '1004',
        code: 'h456wer53',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'Blog Tools',
        rating: 4
      }
    ];
  }

}
