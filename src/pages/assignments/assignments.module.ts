import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignmentsPage } from './assignments';
import { PopoverPage } from "./popover";
import { AssignmentsProvider } from "./assignmentsProvider";

@NgModule({
  declarations: [
    AssignmentsPage,
    PopoverPage
  ],
  imports: [
    IonicPageModule.forChild(AssignmentsPage),
  ],
  entryComponents: [
    AssignmentsPage,
    PopoverPage
  ],
  providers: [
    AssignmentsProvider
  ]
})
export class AssignmentsModule {}
