import { TaskGateway } from "../core/ports/task.gateway";
import { Observable, of } from "rxjs";
import { Task } from "../core/models/task.model";

export class LocalStorageTaskGateway extends TaskGateway {
  add(taskName: string): Observable<Task> {
    const tasks = this.getTasks();
    const newTask = {id: `id-${taskName}`, name: taskName, completed: false};
    this.writeTasks([...tasks, newTask]);
    return of(newTask);
  }

  markAsComplete(taskId: string): Observable<Task> {
    const task = this.getTasks().find(task => task.id === taskId)!;
    task.completed = true;
    const tasks = this.getTasks().map(task => task.id === taskId ? {...task, completed: true} : task);
    this.writeTasks(tasks);
    return of(task);
  }

  markAsUncomplete(taskId: string): Observable<Task> {
    const task = this.getTasks().find(task => task.id === taskId)!;
    task.completed = false;
    const tasks = this.getTasks().map(task => task.id === taskId ? {...task, completed: true} : task);
    this.writeTasks(tasks);
    return of(task);
  }

  remove(taskId: string): Observable<void> {
    const tasks = this.getTasks().filter(task => task.id !== taskId);
    this.writeTasks(tasks);
    return of(void 0);
  }

  retrieveAll(): Observable<Task[]> {
    return of(this.getTasks());
  }

  private getTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
