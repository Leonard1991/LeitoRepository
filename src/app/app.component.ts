import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from './services/task.service';
import { TaskComponent } from './task/task.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NewTaskComponent } from './new-task/new-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { Task } from './models/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  // taskArray: Task[] = [
  //   {id: 1, name : "Task Example 1", done: false},
  //   {id: 2, name : "Task Example 2", done: false},
  //   {id: 3, name : "Task Example 3", done: false},
  //   {id: 4, name : "Task Example 4", done: true}
  //  ];  

  taskArray : Task[];

  displayedColumns: string[] = [
      'id',
      'name',
      'priority',
      'state',
      'date',
      'actions'
  ];
  dataSource!: MatTableDataSource<any>;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _taskService: TaskService){
    this.taskArray = this._taskService.get();
  }
  
  ngOnInit(): void {
      this.getTaskList();     
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openNewTaskForm(){
    const dialogRef = this._dialog.open(TaskComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getTaskList();
        }
      }
    })
  }

  /**
   * Method to
   */
  getTaskList(){
    this._taskService.getTaskList().subscribe({
      next: (res) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:(ex) =>{
        console.error(ex);
      }
    })
  }

  /**
   * 
   * @param id 
   */
  deleteTask(id: number){
    this._taskService.deleteTask(id).subscribe({
      next:(res) => {
        alert('Task deleted')
        this.getTaskList();
      },
      error: console.log,
      // error:(ex) =>{
      //   console.log(ex);
      // }
    })
  }

  /**
   * 
   * @param data 
   */
  openEditTaskForm(data: any){
    const dialogRef = this._dialog.open(TaskComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getTaskList();
        }
      }
    })    
  }


  




  /**
   * Add a new task
   * @param newItem 
   */
   addItem(newItem: string) {
    this._taskService.add(newItem);
  }

  /**
   * Finish a task
   * @param item 
   */
     toDoneTask(item: Task) {
      this._taskService.done(item);
    }



}
