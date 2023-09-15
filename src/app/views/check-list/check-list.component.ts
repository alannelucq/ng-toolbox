import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Task } from 'src/app/core/models/task.model';
import { TuiSvgModule } from "@taiga-ui/core";
import { TaskGateway } from "../../core/ports/task.gateway";
import { BehaviorSubject, switchMap, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { CheckListItemComponent } from "./components/check-list-item.component";
import { AddTaskFormComponent } from "./components/add-task-form.component";

@Component({
  selector: 'app-check-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TuiSvgModule, CheckListItemComponent, AddTaskFormComponent],
  template: `
      <div class="check-list-container">
          <div class="card">
              <h1>Todo-list</h1>
              <app-add-task-form (add)="addTask($event) "/>
              <div class="content">
                  <ng-container *ngIf="tasks()?.length else empty">
                      <app-check-list-item
                          *ngFor="let task of tasks()"
                          [task]="task"
                          (toggle)="toggle($event)"
                          (delete)="delete($event)"
                      />
                  </ng-container>
                  <ng-template #empty>
                      <div class="empty">Ajoute ta première tâche ! ☝🏼</div>
                  </ng-template>
              </div>
          </div>
      </div>
  `,
  styleUrls: ['./check-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CheckListComponent {
  private taskGateway = inject(TaskGateway);
  reload$$ = new BehaviorSubject<void>(void 0);
  tasks = toSignal(this.reload$$.pipe(switchMap(() => this.taskGateway.retrieveAll())));

  addTask(task: string) {
    if (!task) return;
    this.taskGateway.add(task)
      .pipe(tap(() => this.reload$$.next()))
      .subscribe();
  }

  toggle(task: Task) {
    const toggle$ = task.completed ? this.taskGateway.markAsUncomplete(task.id) : this.taskGateway.markAsComplete(task.id);
    toggle$.pipe(tap(() => this.reload$$.next())).subscribe();
  }

  delete(task: Task) {
    this.taskGateway.remove(task.id)
      .pipe(tap(() => this.reload$$.next()))
      .subscribe();
  }
}
