import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MqttRangeComponent } from './mqtt-range.component';

describe('MqttRangeComponent', () => {
  let component: MqttRangeComponent;
  let fixture: ComponentFixture<MqttRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MqttRangeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MqttRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
