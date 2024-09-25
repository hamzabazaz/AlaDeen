import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductImagesDialogueComponent } from './show-product-images-dialogue.component';

describe('ShowProductImagesDialogueComponent', () => {
  let component: ShowProductImagesDialogueComponent;
  let fixture: ComponentFixture<ShowProductImagesDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProductImagesDialogueComponent]
    });
    fixture = TestBed.createComponent(ShowProductImagesDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
