import { Injectable } from '@angular/core';
import { Assignment } from './assignment.class';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AssignmentsProvider {
  private assignments: Assignment[] = [];
  private assignmentsSubject: BehaviorSubject<Assignment[]>;

  constructor() {
    this.assignments = [
      new Assignment(1, 'Setup Ionic', 'Setup your first Ionic project.'),
      new Assignment(2, 'TvShows', 'Create your first tv shows app.'),
      new Assignment(3, 'Goldplating', 'Pimp your tv shows app with cards etc.'),
      new Assignment(4, 'Navigation', 'Create a nice navigation item.'),
      new Assignment(5, 'Native Functions', 'Use native functions like your camera.'),
      new Assignment(6, 'Push Notifications', 'Can you enable push notifications to get messages?'),
    ];

    this.assignmentsSubject = new BehaviorSubject(this.assignments);
  }
  
  public getAssignments() : Observable<Assignment[]> {
    return this.assignmentsSubject.asObservable();
  }

  public addAssignment(title: string, content: string) {
    let lastWeek = this.assignments[this.assignments.length - 1].Week;
    
    this.assignments.push(new Assignment(lastWeek + 1, title, content));
    this.assignmentsSubject.next(this.assignments);
  }

  public removeUncheckedAssignments() {
    this.assignments = this.assignments.filter(a => !a.Checked);
    this.assignmentsSubject.next(this.assignments);
  }
}
