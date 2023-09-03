import { Task } from "../task.model";

export class TaskBuilder {
  protected id: string;
  protected name: string;
  protected completed: boolean;

  withId(value: string) {
    this.id = value;
    return this;
  }

  withName(value: string) {
    this.name = value;
    return this;
  }

  complete() {
    this.completed = true;
    return this;
  }

  uncomplete() {
    this.completed = false;
    return this;
  }

  build(): Task {
    return {
      id: this.id,
      name: this.name,
      completed: this.completed
    }
  }
}

export class StubTaskBuilder extends TaskBuilder {
  protected override id = 'id';
  protected override name = 'Tourner une vidéo sur Angular';
  protected override completed = false;
}
