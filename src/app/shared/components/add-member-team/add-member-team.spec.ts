import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberTeam } from './add-member-team';

describe('AddMemberTeam', () => {
  let component: AddMemberTeam;
  let fixture: ComponentFixture<AddMemberTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMemberTeam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMemberTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
