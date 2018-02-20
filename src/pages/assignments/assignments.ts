import { Component } from '@angular/core';

import { Assignment } from './assignment.class';
import { AssignmentsProvider } from './assignmentsProvider';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
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
    public assignmentsProvider: AssignmentsProvider,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController
  )
  {
    this.assignments = assignmentsProvider.getAssignments();
  }

  presentPopover($event) {
    let popover = this.popoverCtrl.create(PopoverPage, { parentComponent: this });
    popover.present({ ev: $event });
  }

  addAssignment() {
    let alert = this.alertCtrl.create({
      title: 'Add assignment',
      inputs: [
        { name: 'title', placeholder: 'Title' },
        { name: 'content', placeholder: 'Content' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add', handler: data => {
            this.assignments.push(new Assignment(0, data.title, data.content));
          }
        }
      ]
    });
    alert.present();
  }

  removeAssignments() {
    let alert = this.alertCtrl.create({
      title: 'Remove all checked?',
      message: 'Remove all checked assignments? This cannot be undone.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete', role: 'delete',
          handler: () => {
            let toRemove = this.assignments.filter(a => a.Checked);
            for (let a of toRemove) {
              this.assignments.splice(this.assignments.indexOf(a), 1);
            }
          }
        }
      ]
    });
    alert.present();
  }
}



