import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryEditorComponent } from './delivery-editor.component';

describe('DeliveryEditorComponent', () => {
  let component: DeliveryEditorComponent;
  let fixture: ComponentFixture<DeliveryEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
