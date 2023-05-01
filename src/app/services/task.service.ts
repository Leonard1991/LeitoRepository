import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskArray: Task[] = [
    {id: 1, name : "Task Example 1", done: false},
    {id: 2, name : "Task Example 2", done: false},
    {id: 3, name : "Task Example 3", done: false},
    {id: 4, name : "Task Example 4", done: true}
   ];  

  constructor(private _http: HttpClient) { }

  addTask(data: any){
    return this._http.post('http://localhost:3000/tasks', data)
  }

  getTaskList(): Observable<any>{
    return this._http.get('http://localhost:3000/tasks')
  }

  deleteTask(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/tasks/${id}`);
  }

  updateTask(id: number, data: any){
    return this._http.put(`http://localhost:3000/tasks/${id}`, data)
  }

  get() {
    return this.taskArray;
  }

  /**
   * Method to add a new task
   * @param newItem 
   */
  add(newItem: string) {
    let newId = this.taskArray.length +1;
    this.taskArray.push({id: newId, name: newItem, done: false});
  }

    /**
   * Method to finish a task
   * @param item 
   */
     done(item: Task) {
      let index = this.taskArray.indexOf(item);
      item.done = true;
      this.taskArray[index] = item;
    }

    // /**
    //  * 
    //  */
    // allTaskToDone(){
    //   this.taskArray.forEach(function(item){
    //     item.done = true;
    //   });
    // }



}
