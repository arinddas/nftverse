import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNFTMainComponent } from './create-nftmain.component';

describe('CreateNFTMainComponent', () => {
  let component: CreateNFTMainComponent;
  let fixture: ComponentFixture<CreateNFTMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNFTMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNFTMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
