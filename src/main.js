const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const createWindow = () => {
  const width = 800, height = 600;
  const winIcon = path.join(__dirname, '../assets/icon.ico');
  const darwinIcon = path.join(__dirname, '../assets/icons/64x64.png');

  let window = new BrowserWindow({
    minWidth: width,
    minHeight: height,
    icon: process.platform === 'win32' ? winIcon : darwinIcon,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  window.removeMenu();

  if (isDev) window.loadURL('http://localhost:3000');
  else window.loadFile('build/index.html');

  window.on('closed', () => { window = null });
  window.once('ready-to-show', () => {
    window.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})