import { Observable, of } from "rxjs";
import { TaskGateway } from "../core/ports/task.gateway";
import { Task } from "../core/models/task.model";

export class InMemoryTaskGateway extends TaskGateway {

  tasks: Task[] = [];

  withoutTask(): InMemoryTaskGateway {
    this.tasks = [];
    return this;
  }

  withTasks(tasks: Task[]): InMemoryTaskGateway {
    this.tasks = tasks;
    return this;
  }

  override retrieveAll(): Observable<Task[]> {
    return of(this.tasks);
  }

  add(task: string): Observable<Task> {
    const newTask: Task = {id: `id-${task}`, name: task, completed: false};
    this.tasks = [...this.tasks, newTask];
    return of(newTask);
  }

  markAsComplete(id: string): Observable<Task> {
    const updatedTask = this.tasks.find(task => task.id === id)!;
    updatedTask.completed = true;
    this.tasks = this.tasks.map(task => task.id === id ? updatedTask : task);
    return of(updatedTask);
  }

  markAsUncomplete(id: string): Observable<Task> {
    const updatedTask = this.tasks.find(task => task.id === id)!;
    updatedTask.completed = false;
    this.tasks = this.tasks.map(task => task.id === id ? updatedTask : task);
    return of(updatedTask);
  }

  remove(id: string): Observable<void> {
    this.tasks = this.tasks.filter(task => task.id !== id);
    return of(void 0);
  }
}
