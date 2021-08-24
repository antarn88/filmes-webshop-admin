import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreAccountComponent } from './restore-account.component';

describe('RestoreAccountComponent', () => {
  let component: RestoreAccountComponent;
  let fixture: ComponentFixture<RestoreAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoreAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
