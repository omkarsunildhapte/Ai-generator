import { Component, inject, OnInit } from '@angular/core';
import { PlatformService } from '../../service/platform.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent implements OnInit {
  platformService = inject(PlatformService);
  plans: any[] = [];
  ngOnInit(): void {
    this.platformService.getPlatformPrimePlans().subscribe((res: any) => {
      if (res.status == 200) {
        this.plans = res.res;
      }
    });
  }

  selectPlan(planData: any): void {
    const expiry_date = this.calculateExpiryDate(planData.plan_type);
    const body = {
      plan_id: planData.id,
      expiry_date: expiry_date,
      amount: planData.price,
      currency: planData.currency_name,
      status: 'active',
      image_limit: planData.image_limit,
      seats_limit: planData.seats_limit,
      word_limit: planData.word_limit,
    };
    this.platformService.createPlatformPlanHistroy(body).subscribe((res:any)=>{
      if(res.status==200){
        let user = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);
          user = Object.assign({}, user, {
            seat_limit: planData.seats_limit,
            word_limit: planData.word_limit,
            image_limit: planData.image_limit,
            default_plan: planData.id,
            plan_id: planData.id,
            expire_date:expiry_date
          });
        }
        JSON.stringify(user);
      }
    })
  }

  calculateExpiryDate(duration: string) {
    const currentDate = new Date();
    let expiryDate = new Date(currentDate);
    switch (duration) {
      case '1_month':
        expiryDate.setMonth(currentDate.getMonth() + 1);
        break;
      case '3_months':
        expiryDate.setMonth(currentDate.getMonth() + 3);
        break;
      case '6_months':
        expiryDate.setMonth(currentDate.getMonth() + 6);
        break;
      case '1_year':
        expiryDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        throw new Error('Invalid plan duration');
    }
    return expiryDate;
  }
}
