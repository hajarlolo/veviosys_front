import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementsComponent } from './abonnements';

describe('AbonnementsComponent', () => {
  let component: AbonnementsComponent;
  let fixture: ComponentFixture<AbonnementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonnementsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
