import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  planPurchasesData = {
    labels: ['Basic', 'Pro', 'Enterprise'],
    datasets: [
      {
        label: '# of Purchases',
        data: [12, 19, 3],
        backgroundColor: ['#3b82f6', '#34d399', '#fbbf24'],
        borderColor: ['#2563eb', '#059669', '#d97706'],
        borderWidth: 1
      }
    ]
  };

  userActivityData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: '# of Active Users',
        data: [5, 10, 5, 2, 20, 30, 45],
        fill: false,
        borderColor: '#3b82f6'
      }
    ]
  };

  topUsersData = {
    labels: ['User A', 'User B', 'User C', 'User D'],
    datasets: [
      {
        label: 'Top Users',
        data: [300, 50, 100, 75],
        backgroundColor: ['#f87171', '#34d399', '#fbbf24', '#60a5fa'],
        hoverBackgroundColor: ['#ef4444', '#10b981', '#f59e0b', '#3b82f6']
      }
    ]
  };

  planUsageData = {
    labels: ['Basic', 'Pro', 'Enterprise'],
    datasets: [
      {
        label: 'Plan Usage',
        data: [150, 100, 50],
        backgroundColor: ['#3b82f6', '#34d399', '#fbbf24'],
        hoverBackgroundColor: ['#2563eb', '#059669', '#d97706']
      }
    ]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#4B5563'
        },
        grid: {
          color: '#E5E7EB'
        }
      },
      x: {
        ticks: {
          color: '#4B5563'
        },
        grid: {
          color: '#E5E7EB'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#4B5563'
        }
      }
    }
  };
  usersPresentData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: '# of Users Present',
        data: [50, 75, 100, 125, 150, 175, 200],
        backgroundColor: '#34d399',
        borderColor: '#10b981',
        borderWidth: 1
      }
    ]
  };
  onTimeRangeChange(range: any) {
    switch (range) {
      case 'month':
        break;
      case '3month':
        break;
      case '6month':
        break;
      case '1year':
        break;
      case '3year':
        break;
      case '5year':
        break;
      default:
        break;
    }
  }
}
