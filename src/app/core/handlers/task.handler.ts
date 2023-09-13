import { TaskGateway } from "../ports/task.gateway";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";


export default class TaskHandler {

  constructor(private source: TaskGateway) {
  }

  retrieveAll(): Observable<Task[]> {
    return this.source.retrieveAll();
  }

  add(taskName: string) {
    return this.source.add(taskName);
  }

  markAsComplete(taskId: string) {
    return this.source.markAsComplete(taskId);
  }

  markAsUncomplete(taskId: string) {
    return this.source.markAsUncomplete(taskId);
  }

  remove(taskId: string) {
    return this.source.remove(taskId);
  }
}
