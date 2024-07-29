import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsPromptsComponent } from './chats-prompts.component';

describe('ChatsPromptsComponent', () => {
  let component: ChatsPromptsComponent;
  let fixture: ComponentFixture<ChatsPromptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatsPromptsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatsPromptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
