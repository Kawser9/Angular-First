import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesIndexComponent } from './categories-index.component';

describe('CategoriesIndexComponent', () => {
  let component: CategoriesIndexComponent;
  let fixture: ComponentFixture<CategoriesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
