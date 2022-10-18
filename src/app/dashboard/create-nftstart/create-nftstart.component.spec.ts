import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNFTStartComponent } from './create-nftstart.component';

describe('CreateNFTStartComponent', () => {
  let component: CreateNFTStartComponent;
  let fixture: ComponentFixture<CreateNFTStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNFTStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNFTStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
