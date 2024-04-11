import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcClassComponent } from './cc-class.component';

describe('CcClassComponent', () => {
  let component: CcClassComponent;
  let fixture: ComponentFixture<CcClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CcClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CcClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
