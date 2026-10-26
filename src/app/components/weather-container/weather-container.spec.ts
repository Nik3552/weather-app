import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherContainer } from './weather-container';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
