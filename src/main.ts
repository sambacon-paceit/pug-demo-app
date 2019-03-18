// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { Kinvey } from "kinvey-nativescript-sdk";
import { AppModule } from "./app/app.module";

Kinvey.init({
    appKey: "kid_Hk4WsGsI4",
    appSecret: "36b34ff593ee474e9163782183974a0b"
});

Kinvey.ping()
.then((response) => {
    console.log(`Kinvey Ping Success. Kinvey Service is alive,
    version: ${response.version}, response: ${response.kinvey}`);
})
.catch((error) => {
    console.log(`Kinvey Ping Failed. Response: ${error.description}`);
});


platformNativeScriptDynamic().bootstrapModule(AppModule);
