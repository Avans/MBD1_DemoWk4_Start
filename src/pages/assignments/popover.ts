import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AssignmentsProvider } from './assignmentsProvider';
import { Assignment } from './assignment.class';

@Component({
  template: `
  <ion-list>
    <ion-list-header>Options</ion-list-header>
    <button ion-item (click)="addAssignment()">Add new assignment</button>
    <button ion-item (click)="removeAllSelected()">Remove selected</button>
  </ion-list>`
})
export class PopoverPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public assignmentsProvider: AssignmentsProvider) {
  }

  addAssignment() {
    this.assignmentsProvider.addAssignment('title', 'content');
  }

  removeAllSelected() {
    this.assignmentsProvider.removeUncheckedAssignments();
  }
}
