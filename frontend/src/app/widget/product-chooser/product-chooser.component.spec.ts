import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductChooserComponent } from './product-chooser.component';

describe('ProductChooserComponent', () => {
  let component: ProductChooserComponent;
  let fixture: ComponentFixture<ProductChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
