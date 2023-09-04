import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-add-task-form",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
      <form class="heading" (submit)="add.emit(taskInput.value); taskInput.value = ''">
          <input
              #taskInput
              name="Ajouter une tâche"
              placeholder="Ex : Tourner une vidéo sur Angular"
          />
          <button type="submit" id="add-task-button">Ajouter</button>
      </form>
  `,
  styles: [
    `.heading {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
    }`,
    `input {
        width: 100%;
        height: 35px;
        padding: 8px;
        border: 1px solid #b9b9b9;
        border-radius: 5px;
    }`,
    `input:focus {
        outline-color: #2C5364;
    }`,
    `button {
        padding: 8px 32px;
        border-radius: 8px;
        border: none;
        background: #363636;
        color: white;
        font-weight: 500;
        font-size: 0.95rem;
        cursor: pointer;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTaskFormComponent {
  @Output() add = new EventEmitter<string>();
}
