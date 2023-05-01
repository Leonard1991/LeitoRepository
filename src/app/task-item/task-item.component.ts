import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {

  /** Declare variables */
  @Input () inputTask! : Task;
  @Output () onDone = new EventEmitter<Task>();

  constructor(){}

  /**
   * Method to call done event
   */
  done(){
    this.onDone.emit(this.inputTask);
  }

}
