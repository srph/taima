import {app, BrowserWindow} from 'electron';

// Window instance
let win = null;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 380,
    height: 450,
    resizable: process.env.NODE_ENV !== 'production' && process.env.WIN_RESIZABLE,
    fullscreenable: false,
    titleBarStyle: 'hidden'
  });

  win.loadURL(`file://${__dirname}/../index.html`);
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
});