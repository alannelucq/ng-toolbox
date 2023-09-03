import { Observable } from "rxjs";
import { Task } from "../models/task.model";

export abstract class TaskGateway {
  abstract retrieveAll(): Observable<Task[]>;

  abstract addTask(task: string): Observable<Task>;

  abstract markAsComplete(id: string): Observable<Task>;

  abstract markAsUncomplete(id: string): Observable<Task>;

  abstract delete(id: string): Observable<void>;
}
