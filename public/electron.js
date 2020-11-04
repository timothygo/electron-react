const { app, ipcMain, BrowserWindow } = require("electron");

const isDev = require("electron-is-dev");
const config = require("./config");
const actions = require("./actions");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: config.width,
    height: config.height,
    backgroundColor: config.backgroundColor,
    resizable: config.resizable,
    show: config.show,
    frame: config.frame,
    transparent: config.transparent
    webPreferences: {
      nodeIntegration: false,
      devTools: isDev,
      preload: __dirname + "/preload.js"
    }
  });
  if (!isDev) mainWindow.setMenu(null);

  mainWindow.loadURL(
    isDev ? `http://localhost:3000#/` : `file://${__dirname}/index.html`
  );

  //listen to actions
  for (action in actions) {
    ipcMain.on(action, actions[action]);
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
});

app.on("quit", () => {
  //
});
