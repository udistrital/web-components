import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TercerosFormComponent } from './terceros-form.component';

describe('TercerosFormComponent', () => {
  let component: TercerosFormComponent;
  let fixture: ComponentFixture<TercerosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TercerosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TercerosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
