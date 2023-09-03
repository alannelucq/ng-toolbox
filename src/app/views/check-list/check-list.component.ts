import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Task } from 'src/app/core/models/task.model';
import { TuiSvgModule } from "@taiga-ui/core";

@Component({
  selector: 'app-check-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TuiSvgModule],
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export default class CheckListComponent {

  addTask(taskName: string) {}

  toggle(task: Task) {}

  delete(task: Task) {}
}
