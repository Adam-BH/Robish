import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceConnectedComponent } from './device-connected.component';

describe('DeviceConnectedComponent', () => {
  let component: DeviceConnectedComponent;
  let fixture: ComponentFixture<DeviceConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceConnectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
