import { Component, input, output, signal } from '@angular/core';
import { TeamResponse } from '../../models/teams-model';
import { AddMemberTeam } from "../add-member-team/add-member-team";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-team-card',
  imports: [AddMemberTeam, MatIcon, RouterLink],
  templateUrl: './team-card.html',
  styleUrl: './team-card.css',
})
export class TeamCard {
  team = input.required<TeamResponse>();
  isAddingMember = signal(false);
  teamId=output<number>();

  addMember() {
    this.isAddingMember.set(true);
  }

  closeAddMember() {
    this.isAddingMember.set(false);
  }

  teamClicked(){
    this.teamId.emit(this.team().id);
  }

}

