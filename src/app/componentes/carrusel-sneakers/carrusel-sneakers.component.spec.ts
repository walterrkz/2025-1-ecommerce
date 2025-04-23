import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselSneakersComponent } from './carrusel-sneakers.component';

describe('CarruselSneakersComponent', () => {
  let component: CarruselSneakersComponent;
  let fixture: ComponentFixture<CarruselSneakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarruselSneakersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselSneakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
