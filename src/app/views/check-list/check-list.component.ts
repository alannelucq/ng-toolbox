import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Task } from 'src/app/core/models/task.model';
import { TuiSvgModule } from "@taiga-ui/core";
import { TaskGateway } from "../../core/ports/task.gateway";
import { CheckListItemComponent } from "./components/check-list-item.component";
import { AddTaskFormComponent } from "./components/add-task-form.component";
import { exhaustMap, filter, merge, startWith, Subject, switchMap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-check-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TuiSvgModule, CheckListItemComponent, AddTaskFormComponent],
  template: `
      <div class="check-list-container">
          <div class="card">
              <h1>Todo-list</h1>
              <app-add-task-form (add)="add$$.next($event)"/>
              <div class="content">
                  <ng-container *ngIf="tasks()?.length else empty">
                      <app-check-list-item
                          *ngFor="let task of tasks()"
                          [task]="task"
                          (toggle)="toggle$$.next($event)"
                          (delete)="delete$$.next($event)"
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

  add$$ = new Subject<string>();
  toggle$$ = new Subject<Task>();
  delete$$ = new Subject<Task>();

  private add$ = this.add$$.asObservable().pipe(
    filter(Boolean),
    exhaustMap(taskName => this.taskGateway.add(taskName))
  );

  private toggle$ = this.toggle$$.asObservable().pipe(
    switchMap(task => task.completed ? this.taskGateway.markAsUncomplete(task.id) : this.taskGateway.markAsComplete(task.id))
  );

  private delete$ = this.delete$$.asObservable().pipe(
    exhaustMap(task => this.taskGateway.remove(task.id))
  );

  tasks = toSignal(
    merge(this.add$, this.toggle$, this.delete$).pipe(
      startWith(void 0),
      switchMap(() => this.taskGateway.retrieveAll())
    )
  );
}
