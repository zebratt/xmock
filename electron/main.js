const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const spawn = require('child_process').spawn

const server = spawn('node', ['../server/bin/www'])

let win

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        })
    )

    win.webContents.openDevTools()

    win.on('closed', () => {
        server.kill()
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})