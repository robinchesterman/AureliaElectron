import { useView } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import { remote } from "electron";

@useView(PLATFORM.moduleName("./app.html"))
export class App {

    public message = "Hello world!";

    constructor() {
        console.log(remote);
    }

}
