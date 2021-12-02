const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

const windowWidth = 1024;
const windowHeight = 600;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        minWidth: windowWidth,
        minHeight: windowHeight,
    });
    mainWindow.removeMenu();

    const appUrl = process.env.ELECTRON_START_URL || url.format({pathname: path.join(__dirname, 'build/index.html'), protocol: 'file:', slashes: true})
        console.log(__dirname);
    mainWindow.loadURL(appUrl);

    mainWindow.on('closed', () => { mainWindow = null })
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.plaform !== 'darwin') { app.quit() }
})
app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) { createWindow() }
});