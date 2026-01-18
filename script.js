// 状態管理
let cart = JSON.parse(localStorage.getItem('GoodUI_Cart')) || [];
let menuData = [];

// 要素の取得
const menuGrid = document.getElementById('menu-grid');
const cartCountLabel = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');

// 初期化: JSON読み込み
async function init() {
    try {
        const response = await fetch('menu.json');
        menuData = await response.json();
        renderMenu();
        updateCartCount();
    } catch (error) {
        console.error("メニューの読み込みに失敗しました:", error);
    }
}

// メニュー描画
function renderMenu() {
    menuGrid.innerHTML = menuData.map(item => `
        <div class="card" onclick="addToCart(${item.id})">
            <img src="${item.image}" alt="${item.name}">
            <div class="card-info">
                <div class="card-title">${item.name}</div>
                <div class="card-price">税込 ${item.price}円</div>
            </div>
        </div>
    `).join('');
}

// カート追加
// --- 既存の変数に「選択中の商品」を保持する変数を追加 ---
let selectedProduct = null;

// --- 既存の addToCart 関数を【書き換え】 ---
// これまでは直接カートに入れていたが、オプション画面を開く役割に変更
window.addToCart = function(id) {
    selectedProduct = menuData.find(p => p.id === id);
    
    // オプション画面の情報をセット
    document.getElementById('opt-product-name').innerText = selectedProduct.name;
    const container = document.getElementById('opt-list-container');
    
    if (selectedProduct.options && selectedProduct.options.length > 0) {
        container.innerHTML = selectedProduct.options.map((opt, index) => `
            <label class="opt-item">
                <span>${opt.name} (+${opt.price}円)</span>
                <input type="checkbox" class="opt-checkbox" data-index="${index}">
            </label>
        `).join('');
    } else {
        container.innerHTML = "<p>選択可能なオプションはありません</p>";
    }
    
    document.getElementById('option-modal').style.display = 'block';
};

// --- 新規追加: オプション画面を閉じる ---
window.closeOptionModal = function() {
    document.getElementById('option-modal').style.display = 'none';
};

// --- 新規追加: オプションを含めてカートに保存する確定処理 ---
document.getElementById('opt-add-to-cart-btn').onclick = () => {
    const checkboxes = document.querySelectorAll('.opt-checkbox');
    const selectedOptions = [];
    let extraPrice = 0;

    checkboxes.forEach(cb => {
        if (cb.checked) {
            const optIndex = cb.getAttribute('data-index');
            const option = selectedProduct.options[optIndex];
            selectedOptions.push(option.name);
            extraPrice += option.price;
        }
    });

    // カートに入れるデータ構造を「オプション込み」に拡張
    const cartItem = {
        ...selectedProduct,
        displayPrice: selectedProduct.price + extraPrice, // オプション込みの価格
        selectedOptions: selectedOptions // 選択したオプション名の配列
    };

    cart.push(cartItem);
    saveCart();
    updateCartCount();
    closeOptionModal();
    console.log(`${selectedProduct.name}（${selectedOptions.join(', ')}）をカートに追加しました`);
};

// --- 既存の renderCartList 関数を【書き換え】 ---
// 選択したオプションと正しい金額が表示されるように修正
function renderCartList() {
    const list = document.getElementById('cart-items-list');
    const totalLabel = document.getElementById('total-price');
    
    if (cart.length === 0) {
        list.innerHTML = "<p>カートは空です</p>";
    } else {
        list.innerHTML = cart.map((item, index) => `
            <div style="display:flex; justify-content:space-between; padding:15px; border-bottom:1px solid #eee; align-items:center;">
                <div>
                    <div style="font-weight:bold;">${item.name}</div>
                    <div style="font-size:0.8em; color:#666;">${item.selectedOptions ? item.selectedOptions.join(', ') : ''}</div>
                </div>
                <span>${item.displayPrice || item.price}円 <button onclick="removeFromCart(${index})" style="margin-left:10px; padding:5px 10px;">削除</button></span>
            </div>
        `).join('');
    }

    // displayPrice（オプション込み）がある場合はそれを使う、なければ価格を使う
    const total = cart.reduce((sum, item) => sum + (item.displayPrice || item.price), 0);
    totalLabel.innerText = `合計: 税込 ${total}円`;
}

// カート保存
function saveCart() {
    localStorage.setItem('GoodUI_Cart', JSON.stringify(cart));
}

// カート件数表示更新
function updateCartCount() {
    cartCountLabel.innerText = cart.length;
}

// カート画面の表示制御
document.getElementById('cart-open-btn').onclick = () => {
    renderCartList();
    cartModal.style.display = 'block';
};

document.getElementById('cart-close-btn').onclick = () => {
    cartModal.style.display = 'none';
};

function renderCartList() {
    const list = document.getElementById('cart-items-list');
    const totalLabel = document.getElementById('total-price');
    
    if (cart.length === 0) {
        list.innerHTML = "<p>カートは空です</p>";
    } else {
        list.innerHTML = cart.map((item, index) => `
            <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
                <span>${item.name}</span>
                <span>${item.price}円 <button onclick="removeFromCart(${index})" style="margin-left:10px;">削除</button></span>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalLabel.innerText = `合計: 税込 ${total}円`;
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCartList();
};

document.getElementById('order-confirm-btn').onclick = () => {
    if (cart.length === 0) return alert("カートが空です");
    alert("注文を確定しました！サーバーに送信します（デモ）");
    cart = [];
    saveCart();
    updateCartCount();
    cartModal.style.display = 'none';
};

// 実行
init();