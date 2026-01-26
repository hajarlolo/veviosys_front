import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar'; // Changed from Sidebar
import { RouterModule } from '@angular/router';

describe('SidebarComponent', () => { // Changed name
  let component: SidebarComponent; // Changed type
  let fixture: ComponentFixture<SidebarComponent>; // Changed type

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // We add RouterModule because our sidebar uses routerLink
      imports: [SidebarComponent, RouterModule.forRoot([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});