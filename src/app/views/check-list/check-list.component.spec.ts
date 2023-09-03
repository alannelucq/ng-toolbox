import { ComponentFixture, TestBed } from '@angular/core/testing';

import CheckListComponent from './check-list.component';
import { InMemoryTaskGateway } from "../../core/adapters/in-memory-task.gateway";
import { TaskGateway } from "../../core/ports/task.gateway";
import { TaskBuilder } from "../../core/builders/task.builder";
import { Task } from '../../core/models/task.model';

describe('CheckListComponent', () => {
  let fixture: ComponentFixture<CheckListComponent>;
  let taskGateway: InMemoryTaskGateway;

  beforeEach(() => {
    taskGateway = new InMemoryTaskGateway();
    TestBed.configureTestingModule({
      imports: [CheckListComponent],
      providers: [{provide: TaskGateway, useValue: taskGateway}]
    })
  });

  it('should not have any task', () => {
    setup([]);
    expect(fixture.nativeElement.textContent).toContain('Ajoute ta première tâche ! ☝🏼');
  });

  it('should have tasks', () => {
    setup([
      new StubTaskBuilder().uncomplete().build(),
      new StubTaskBuilder().complete().build(),
    ]);
    expect(getCheckboxes().length).toBe(2);
    expect(getCheckboxes({checked: true}).length).toBe(1);
  });

  it('should add task', () => {
    setup([]);
    getElement('input[name="Ajouter une tâche"]').value = 'Aller au sport';
    getElement('button[type="submit"]').click();
    fixture.detectChanges();
    expect(getCheckboxes().length).toBe(1);
  });

  it('should mark task as complete', () => {
    setup([new StubTaskBuilder().withId('id').uncomplete().build()]);
    jest.spyOn(taskGateway, 'markAsComplete');
    getCheckboxes()[0].click();
    expect(taskGateway.markAsComplete).toHaveBeenCalledWith('id');
  });

  it('should mark task as uncomplete', () => {
    setup([new StubTaskBuilder().withId('id').complete().build()]);
    jest.spyOn(taskGateway, 'markAsUncomplete');
    getCheckboxes()[0].click();
    expect(taskGateway.markAsUncomplete).toHaveBeenCalledWith('id');
  });

  it('should remove task', () => {
    setup([new StubTaskBuilder().withName('Faire les courses de la semaine').build()]);
    getElement('button[aria-label="Supprimer la tâche : Faire les courses de la semaine"]').click();
    fixture.detectChanges();
    expect(getCheckboxes().length).toBe(0);
  });

  function setup(tasks: Task[]) {
    taskGateway.withTasks(tasks);
    fixture = TestBed.createComponent(CheckListComponent);
    fixture.detectChanges();
  }

  function getCheckboxes({checked}: { checked: boolean } = {checked: false}) {
    return fixture.nativeElement.querySelectorAll(`input[type="checkbox"]${checked ? ':checked' : ''}`);
  }

  function getElement(matcher: string) {
    return fixture.nativeElement.querySelector(matcher);
  }
});

class StubTaskBuilder extends TaskBuilder {
  protected override id = 'id';
  protected override name = 'Tourner une vidéo sur Angular';
  protected override completed = false;
}
