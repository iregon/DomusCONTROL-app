import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BootPage } from './boot.page';

describe('BootPage', () => {
  let component: BootPage;
  let fixture: ComponentFixture<BootPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BootPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
