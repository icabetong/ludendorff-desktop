const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const windowWidth = 1024;
const windowHeight = 600;
const windowSettings = {
    width: windowWidth,
    height: windowHeight,
    minWidth: windowWidth,
    minHeight: windowHeight,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
}

function createWindow() {
    mainWindow = new BrowserWindow(windowSettings);
    mainWindow.removeMenu();

    const appUrl = isDev ? 'http://localhost:3000' 
        : `file://${path.join(__dirname, '../build/index.html')}`;
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