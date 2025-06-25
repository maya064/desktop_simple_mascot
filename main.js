// モジュールの読み込み
const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

// メインウィンドウの初期設定
function createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true,   // フルスクリーン
        transparent: true,  // 背景色を透過
        alwaysOnTop: true,  // 最前面設定
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    // マウスクリックの無効化
    mainWindow.setIgnoreMouseEvents(true);
    // タイトルバーを非表示にする
    mainWindow.setMenuBarVisibility(false);
    // index.htmlを読み込んで、画面表示を行う
    mainWindow.loadFile('index.html');
}

// トレイメニューの初期設定
function createTray() {
    let isMoving = true;
    // トレイメニューの生成
    const tray = new Tray(path.join(__dirname, 'assets/tray_icon.png'));
    const buildMenu = () => Menu.buildFromTemplate([
        {
            label: isMoving ? 'マスコットを止める' : 'マスコットを動かす',
            // クリックされたときの処理
            click: () => {
                // ボタンの文言を変更する
                isMoving = !isMoving;
                tray.setContextMenu(buildMenu());
                // toggle-movementに送る
                mainWindow.webContents.send('toggle-movement', isMoving);
            }
        },
        { 
            label: '終了', 
            // クリックされたときの処理
            click: () => app.quit() 
        }
    ]);
    // マウスオーバーした時の文言を設定
    tray.setToolTip('Desktop Mascot');
    // トレイメニュー設定を適応
    tray.setContextMenu(buildMenu());
}

// アプリケーションが起動したときに
// ウィンドウとトレイメニューの初期設定を行う
app.whenReady().then(() => {
    createWindow();
    createTray();
});
