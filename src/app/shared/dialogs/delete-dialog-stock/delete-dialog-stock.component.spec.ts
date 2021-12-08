import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogStockComponent } from './delete-dialog-stock.component';

describe('DeleteDialogStockComponent', () => {
  let component: DeleteDialogStockComponent;
  let fixture: ComponentFixture<DeleteDialogStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDialogStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
