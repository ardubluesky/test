const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const sqlite3 = require('sqlite3');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webPreferences: {
        nodeIntegration: true,
        // ... other options
      },
    }
  });

  win.loadFile('./src/index.html')

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})