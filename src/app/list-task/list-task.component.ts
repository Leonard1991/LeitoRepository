import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss'],
  
})
export class ListTaskComponent {

  /** Array of task object */
  @Input() taskList: Task[] = [];

    constructor(){
      // this.verifyDoneTasks();
    }

    /**
   * Method to finish a task
   * @param item 
   */
     toDoneTask(item: Task) {
      let index = this.taskList.indexOf(item);
      item.done = true;
      this.taskList[index] = item;
    }

    /**
     * Method to pass all the task to done
     */
    allTaskToDone(){
      this.taskList.forEach(x => x.done = true);      
    }

    /**
     * Method return if should show/hide button
     * @returns 
     */
    verifyDoneTasks(){
      let myReturn = true;
      let myDoneTaskArray = this.taskList.filter(x => x.done == true);
      if(myDoneTaskArray.length == this.taskList.length)
      {
        myReturn = false;
      }
        return myReturn;
    }
  
}
