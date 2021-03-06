import {enableProdMode, isDevMode} from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

// root component
import { AppModule } from "./app/app.module";

// Declare process variable (so that type checker doesn't nag about it)
declare var process;

if (process.env.NODE_ENV === "production") {
  //enableProdMode();
    isDevMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);