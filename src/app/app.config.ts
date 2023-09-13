import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { InMemoryTaskGateway } from "./adapters/in-memory-task.gateway";
import TaskHandler from "./core/handlers/task.handler";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(TuiRootModule, BrowserAnimationsModule),
    {provide: TaskHandler, useValue: () => new TaskHandler(new InMemoryTaskGateway())}
  ]
};
