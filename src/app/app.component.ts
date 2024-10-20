import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodoList';
  show = true;
  errorMessage: string = '';

  addTask(taskData: any) {
    try {
      throw { message: "Task description is required" };
    } catch (error) {
      if (error && error.message) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = JSON.stringify(error);
      }
    }
  }

  simulateTaskAddition() {
    const taskData = {};
    this.addTask(taskData);
  }
}
