const url = require('url');
const path = require('path');
const {app, BrowserWindow, ipcMain} = require('electron');

let mainWindow;


// set ENV
process.env.NODE_ENV = 'production';


ipcMain.on('button:click',function(event,arg){
        console.log("receive message from render: ", arg);
        event.sender.send('main-reply-to-render',arg);
});

// Listen for app to be ready 
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            //preload: path.join(app.getAppPath(), 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    if (process.env.NODE_ENV != 'production') {
        mainWindow.webContents.openDevTools();
    }

    // load html into window 
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));


    // Quit app when closed 
    mainWindow.on('closed', function() {
        app.quit();
    });

})