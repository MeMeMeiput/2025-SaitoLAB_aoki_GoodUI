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
window.addToCart = function(id) {
    const product = menuData.find(p => p.id === id);
    cart.push(product);
    saveCart();
    updateCartCount();
    // 簡易的なフィードバック
    console.log(`${product.name}をカートに追加しました`);
};

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