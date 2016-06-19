import {app, BrowserWindow} from 'electron';

// Window instance
let win = null;

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(`file://${__dirname}/../index.html`);
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
});