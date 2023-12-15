const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database("test.db");

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webPreferences: {
        // ... other options
      },
    }
  });

  db.run('CREATE TABLE IF NOT EXISTS students(name text, phn_num int)');

  win.loadFile('./src/index.html')

}

ipcMain.handle('data_insert', async(event:Event, name:String, phn_num:String) => {
  console.log("front end connection successful.");
  console.log("attained value: "+name+phn_num);
  
  var num = 0;
  for(var i = 9; i >= 0; i--){
    num += parseInt(phn_num.charAt(i));
    num *= 10;
  }

  db.run(`INSERT INTO students(name, phn_num) VALUES(?, ?)`, [name], [phn_num]);

  return name;
})

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
  db.close();
})