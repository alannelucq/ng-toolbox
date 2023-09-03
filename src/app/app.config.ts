import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TaskGateway } from "./core/ports/task.gateway";
import { InMemoryTaskGateway } from "./core/adapters/in-memory-task.gateway";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(TuiRootModule, BrowserAnimationsModule),
    {provide: TaskGateway, useValue: new InMemoryTaskGateway()}
  ]
};
