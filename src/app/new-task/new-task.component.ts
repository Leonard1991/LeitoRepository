import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  
  /** Output to add a new task */
  @Output() newItemEvent = new EventEmitter<string>();
  
  //name: string = "";

  /**
   * Method to call add event
   * @param value 
   */
  addNewItem(value: string) {
    this.newItemEvent.emit(value);    
  }

}
