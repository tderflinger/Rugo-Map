import { app, BrowserWindowProxy } from "electron";

export const fileMenuTemplate = {
  label: "File",
  submenu: [
    { label: "Open Track", accelerator: "CmdOrCtrl+O", selector: "open:",
    click () {
      BrowserWindowProxy.win.eval("window.load();");
    }
   },
    { label: "Save Track", accelerator: "CmdOrCtrl+S", selector: "save:",
    click () {
      BrowserWindow.window.save();
    } },
  ]
};
