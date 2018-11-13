import { Aurelia } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";

export async function configure(aurelia: Aurelia): Promise<void> {
  aurelia.use.standardConfiguration();

  await aurelia.start();
  aurelia.setRoot(PLATFORM.moduleName("app"));
}
