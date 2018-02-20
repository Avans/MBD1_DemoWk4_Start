import { Component } from '@angular/core';

import { Assignment } from './assignment.class';
import { AssignmentsProvider } from './assignmentsProvider';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverPage } from "./popover";

@IonicPage()
@Component({
  selector: 'page-assignments',
  templateUrl: 'assignments.html',
})
export class AssignmentsPage {
  assignments: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public assignmentsProvider: AssignmentsProvider
  )
  {
    this.assignments = assignmentsProvider.getAssignments();
  }

  presentPopover($event) {
    // TODO: Implement
  }
}



