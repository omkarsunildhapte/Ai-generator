import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromtsChatComponent } from './promts-chat.component';

describe('PromtsChatComponent', () => {
  let component: PromtsChatComponent;
  let fixture: ComponentFixture<PromtsChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromtsChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromtsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
