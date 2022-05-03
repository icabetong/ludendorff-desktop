const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const createWindow = () => {
  const width = 1024, height = 800;
  let window = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  window.removeMenu();

  const appUrl = process.env.ELECTRON_START_URL || url.format({ pathname: path.join(__dirname, 'build/index.html'), protocol: 'file:', slashes: true });
  window.loadURL(appUrl);

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