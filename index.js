/**
 * main-thread entry
 */

const {app, BrowserWindow} = require('electron')


function isDev() {
  if (process.env.ELECTRON_ENV === "production") {
    return false;
  }

  if (typeof(process.mainModule) === "undefined") {
    return true;
  }

  return process.mainModule.filename.indexOf("app.asar") === -1;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  const mainWidth = 800;
  const mainHeight = 600;

  const mainWindow = new BrowserWindow({
    width: mainWidth,
    height: mainHeight,
    frame: isDev()
  });

  mainWindow.loadURL(isDev() ?
    "http://localhost:8080" :
    "file://" + __dirname + "/build/index.html"
  );

  mainWindow.on("closed",  () => {
      // closed
  });
});
