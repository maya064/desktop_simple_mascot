// モジュールの読み込み
const { contextBridge, ipcRenderer } = require('electron');

// セキュリティの観点からpreload.jsを用いて
// メインプロセス(main.js)とレンダラー(app.js)の橋渡しを行う
contextBridge.exposeInMainWorld('api', {
    onToggleMovement: (callback) => ipcRenderer.on('toggle-movement', (event, isMoving) => callback(isMoving))
});
