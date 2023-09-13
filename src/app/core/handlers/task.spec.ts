import { InMemoryTaskGateway } from "../../adapters/in-memory-task.gateway";
import TaskHandler from "./task.handler";
import { StubTaskBuilder, TaskBuilder } from "../models/builders/task.builder";
import { Task } from "../models/task.model";

describe('Task Handler', () => {
  let taskHandler: TaskHandler;

  it('should not have any task', done => {
    withoutTask();
    taskHandler.retrieveAll().subscribe(tasks => {
      expect(tasks).toEqual([]);
      done();
    });
  });

  it('should fetches tasks', done => {
    withTasks([
      new TaskBuilder().withId('id-task').withName('Aller au sport').uncomplete().build()
    ]);
    taskHandler.retrieveAll().subscribe(tasks => {
      expect(tasks).toEqual([
        new TaskBuilder().withId('id-task').withName('Aller au sport').uncomplete().build()
      ]);
      done();
    });
  });

  it('should add task', done => {
    withoutTask();
    taskHandler.add('Aller au sport').subscribe();
    taskHandler.retrieveAll().subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].name).toBe('Aller au sport');
      done();
    })
  });

  it('should mark task as complete', done => {
    withTasks([new StubTaskBuilder().withId('id').uncomplete().build()]);
    taskHandler.markAsComplete('id').subscribe();
    taskHandler.retrieveAll().subscribe(([task]) => {
      expect(task.completed).toBe(true);
      done();
    });
  });

  it('should mark task as uncomplete', done => {
    withTasks([new StubTaskBuilder().withId('id').uncomplete().build()]);
    taskHandler.markAsUncomplete('id').subscribe();
    taskHandler.retrieveAll().subscribe(([task]) => {
      expect(task.completed).toBe(false);
      done();
    });
  });

  it('should remove task', done => {
    withTasks([new StubTaskBuilder().withId('id').build()]);
    taskHandler.remove('id').subscribe();
    taskHandler.retrieveAll().subscribe(tasks => {
      expect(tasks.length).toBe(0);
      done();
    });
  });

  function withTasks(tasks: Task[]) {
    const source = new InMemoryTaskGateway().withTasks(tasks);
    taskHandler = new TaskHandler(source);
  }

  function withoutTask() {
    const source = new InMemoryTaskGateway().withoutTask();
    taskHandler = new TaskHandler(source);
  }
});
