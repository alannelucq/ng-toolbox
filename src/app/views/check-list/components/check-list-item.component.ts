import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "src/app/core/models/task.model";
import { NgClass } from "@angular/common";
import { TuiSvgModule } from "@taiga-ui/core";

@Component({
  selector: 'app-check-list-item',
  standalone: true,
  imports: [NgClass, TuiSvgModule],
  template: `
      <div class="task">
          <input type="checkbox" [checked]="task.completed" (change)="toggle.emit(task)">
          <span [ngClass]="{ completed: task.completed}">{{ task.name }}</span>
          <button
              class="icon-button"
              [attr.aria-label]="'Supprimer la tâche : ' + task.name"
              (click)="delete.emit(task)"
          >
              <tui-svg src="tuiIconClose"></tui-svg>
          </button>
      </div>
  `,
  styles: [
    `.task {
        display: flex;
        align-items: center;
    }`,
    `input[type="checkbox"] {
        accent-color: #3f50b5ff;
        padding: 10px;
        cursor: pointer;
        margin-right: 8px;
    }`,
    `.completed {
        text-decoration: line-through;
        color: slategrey;
    }`,
    `.icon-button {
        background: transparent;
        border: none;
        cursor: pointer;
    }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckListItemComponent {

  @Input({required: true}) task: Task;
  @Output() toggle = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
}
