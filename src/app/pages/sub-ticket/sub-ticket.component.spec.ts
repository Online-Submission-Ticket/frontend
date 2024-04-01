import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTicketComponent } from './sub-ticket.component';

describe('SubTicketComponent', () => {
  let component: SubTicketComponent;
  let fixture: ComponentFixture<SubTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
