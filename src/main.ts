// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { AppModule } from "./app/app.module";

Kinvey.init({
    appKey: 'kid_Hk4WsGsI4',
    appSecret: '36b34ff593ee474e9163782183974a0b'
});

Kinvey.ping()
.then((response) => {
    console.log(`Kinvey Ping Success. Kinvey Service is alive, version: ${response.version}, response: ${response.kinvey}`);
})
.catch((error) => {
    console.log(`Kinvey Ping Failed. Response: ${error.description}`);
});

// A traditional NativeScript application starts by initializing global objects,
// setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization:
// modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together,
// so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
platformNativeScriptDynamic().bootstrapModule(AppModule);
