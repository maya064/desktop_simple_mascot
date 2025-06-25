// マスコットの要素を取得
const mascotElem = document.getElementById('mascot');
// マスコットの幅(width)を取得
const mascotWidth = window.getComputedStyle(mascotElem).width;

let isMoving = true; // マスコットの動作フラグ(true時に動く)
let direction = -1;  // マスコットの進行方向(1=右咆哮, -1=左方向)
let speed = 1;       // マスコットの進行速度
let position = 0;    // マスコットの表示位置

// マスコットを移動させる(再起関数)
function animate() {
    if (isMoving) {
        // マスコットの表示位置を計算
        position += direction * speed;
        // マスコットが画面端まで到達したときに発火
        if (position < 0 || position > window.innerWidth - parseInt(mascotWidth) - 1) {
            // マスコットの進行方向を反転
            direction *= -1;
            // マスコット(gif)の表示を反転
            mascot.style.transform = direction === -1 ? 'scaleX(-1)' : 'scaleX(1)';
        }
        // マスコットの表示位置を更新
        mascot.style.left = `${position}px`;
    }
    // アニメーションを開始
    requestAnimationFrame(animate);
}

// トレイメニューからマスコットの動作変更時
// 変数の更新を行う
window.api.onToggleMovement((newState) => {
    isMoving = newState;
});

// アニメーションを開始
requestAnimationFrame(animate);
