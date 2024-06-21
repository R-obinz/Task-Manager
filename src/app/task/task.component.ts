import { Component } from '@angular/core';
import { Task } from '../models/task.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  taskForm: FormGroup;
  tasks: Task[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }
  

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTask();
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: new Date().getTime().toString(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        completed: false
      };
      this.taskService.addTask(newTask);
      this.loadTasks();
      this.taskForm.reset();
    }
  }

  toggleCompletion(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
    this.loadTasks();
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }
}
