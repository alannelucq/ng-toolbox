import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Task } from 'src/app/core/models/task.model';
import { TuiSvgModule } from "@taiga-ui/core";
import { TaskGateway } from "../../core/ports/task.gateway";
import { BehaviorSubject, switchMap, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { CheckListItemComponent } from "./components/check-list-item.component";

@Component({
  selector: 'app-check-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TuiSvgModule, CheckListItemComponent],
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export default class CheckListComponent {
  @ViewChild('taskInput') taskInput: ElementRef<HTMLInputElement>;
  private taskGateway = inject(TaskGateway);
  reload$$ = new BehaviorSubject<void>(void 0);
  tasks = toSignal(this.reload$$.pipe(switchMap(() => this.taskGateway.retrieveAll())));

  addTask(task: string) {
    if (!task) return;
    this.taskGateway.addTask(task)
      .pipe(
        tap(() => {
          this.reload$$.next();
          this.taskInput.nativeElement.value = ''
        }))
      .subscribe();
  }

  toggle(task: Task) {
    const toggle$ = task.completed ? this.taskGateway.markAsUncomplete(task.id) : this.taskGateway.markAsComplete(task.id);
    toggle$.subscribe();
  }

  delete(task: Task) {
    this.taskGateway.delete(task.id)
      .pipe(tap(() => this.reload$$.next()))
      .subscribe();
  }
}
