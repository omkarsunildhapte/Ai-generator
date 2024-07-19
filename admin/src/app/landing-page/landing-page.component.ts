import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  currentTab: string = 'monthly';
  plans = {
    monthly: [
      {
        name: 'Basic Plan',
        description: 'Ideal for individuals and small teams.',
        price: '$19',
        features: ['Feature One', 'Feature Two', 'Feature Three'],
      },
      {
        name: 'Pro Plan',
        description: 'Perfect for growing teams and businesses.',
        price: '$49',
        features: [
          'Feature One',
          'Feature Two',
          'Feature Three',
          'Feature Four',
        ],
      },
      {
        name: 'Enterprise Plan',
        description: 'For large teams and enterprises.',
        price: '$99',
        features: [
          'Feature One',
          'Feature Two',
          'Feature Three',
          'Feature Four',
          'Feature Five',
        ],
      },
    ],
    annual: [
      {
        name: 'Basic Plan',
        description: 'Ideal for individuals and small teams.',
        price: '$199',
        features: ['Feature One', 'Feature Two', 'Feature Three'],
      },
      {
        name: 'Pro Plan',
        description: 'Perfect for growing teams and businesses.',
        price: '$499',
        features: [
          'Feature One',
          'Feature Two',
          'Feature Three',
          'Feature Four',
        ],
      },
      {
        name: 'Enterprise Plan',
        description: 'For large teams and enterprises.',
        price: '$999',
        features: [
          'Feature One',
          'Feature Two',
          'Feature Three',
          'Feature Four',
          'Feature Five',
        ],
      },
    ],
    prepaid: [
      {
        name: 'Basic Plan',
        description: 'Ideal for individuals and small teams.',
        price: '$29',
        features: ['Feature One', 'Feature Two', 'Feature Three'],
      },
      {
        name: 'Pro Plan',
        description: 'Perfect for growing teams and businesses.',
        price: '$69',
        features: [
          'Feature One',
          'Feature Two',
          'Feature Three',
          'Feature Four',
        ],
      },
      {
        name: 'Enterprise Plan',
        description: 'For large teams and enterprises.',
        price: '$139',
        features: [
          'Feature One',
          'Feature Two',
          'Feature Three',
          'Feature Four',
          'Feature Five',
        ],
      },
    ],
  };
  faqs = [
    {
      question: 'What is your return policy?',
      answer:
        'Our return policy allows you to return products within 30 days of purchase for a full refund. Items must be in their original condition and packaging.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can contact customer support via email at support@example.com or by calling our toll-free number at 1-800-123-4567.',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we offer international shipping to most countries. Shipping costs and delivery times vary depending on the destination.',
    },
  ];
  activeTabData: any[] = [];
  ngOnInit(): void {
    this.activeTabData = this.plans.monthly;
  }
  openIndex: number | null = null;

  toggleAccordion(index: number): void {
    if (this.openIndex === index) {
      this.openIndex = null;
    } else {
      this.openIndex = index;
    }
  }

  showTab(tab: string) {
    this.currentTab = tab;
    this.activeTabData =
      this.currentTab == 'monthly'
        ? this.plans.monthly
        : this.currentTab == 'annual'
        ? this.plans.annual
        : this.plans.prepaid;
  }

  getButtonClasses(tab: string): string {
    return this.currentTab === tab ? `buttoncolor text-white` : ``;
  }
}
