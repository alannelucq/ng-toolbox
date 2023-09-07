import { Observable } from "rxjs";
import { Task } from "../models/task.model";

export abstract class TaskGateway {
  abstract retrieveAll(): Observable<Task[]>;

  abstract add(task: string): Observable<Task>;

  abstract markAsComplete(id: string): Observable<Task>;

  abstract markAsUncomplete(id: string): Observable<Task>;

  abstract remove(id: string): Observable<void>;
}
