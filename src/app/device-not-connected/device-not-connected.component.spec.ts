import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceNotConnectedComponent } from './device-not-connected.component';

describe('DeviceNotConnectedComponent', () => {
  let component: DeviceNotConnectedComponent;
  let fixture: ComponentFixture<DeviceNotConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceNotConnectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceNotConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
