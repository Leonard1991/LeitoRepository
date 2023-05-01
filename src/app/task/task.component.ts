
import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { formatDate } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{
  
  @Output() change = new EventEmitter();

  taskForm: FormGroup;

  states: string[] =[
    'ToDo',
    'Doing',
    'Done'
  ];

  selected = 'ToDo';
  today = new Date();
  
  constructor(
      private _fb: FormBuilder, 
      private _taskService: TaskService, 
      private _dialogRef: MatDialogRef<TaskComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ){
    this.taskForm = this._fb.group({
      name: '',
      state: '',
      priority: '',
      date:this.today,
    });
  }

  ngOnInit(): void {
    // console.log(this.data);
      this.taskForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.taskForm.valid){
      if(this.data){
        this._taskService
          .updateTask(this.data.id, this.taskForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Task updated successfully');
              this._dialogRef.close(true);
            },
            error: (ex: any) => {
              console.error(ex);
            }
          })
      }
      else{
        this._taskService
          .addTask(this.taskForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Task added successfully');
              this._dialogRef.close(true);
            },
            error: (ex: any) => {
              console.error(ex);
            }
        })
      }
      
    }
  }
}
