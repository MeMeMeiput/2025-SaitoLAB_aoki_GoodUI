// 1. 状態管理
let cart = JSON.parse(localStorage.getItem('GoodUI_Cart')) || [];
let menuData = [
    {
        "id": 1,
        "name": "ブレンドコーヒー",
        "price": 500,
        "image": "images/ブレンドコーヒー.png",
        "options": [
            {"name": "砂糖", "price": 0},
            {"name": "ミルク", "price": 0},
            {"name": "ホイップ追加", "price": 100}
        ]
    },
    {
        "id": 2,
        "name": "アメリカーノ",
        "price": 600,
        "image": "images/アメリカーノ.png",
        "options": [
            {"name": "濃いめ", "price": 0},
            {"name": "氷なし", "price": 0}
        ]
    }
];
let selectedProduct = null;

// 2. 初期化（HTML読み込み完了時に実行）
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    renderMenu();
    updateCartCount();
    setupEventListeners();
}

// 3. メニュー描画
function renderMenu() {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;

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

// 4. イベントリスナー（ボタン操作など）
function setupEventListeners() {
    const cartOpenBtn = document.getElementById('cart-open-btn');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const optAddToCartBtn = document.getElementById('opt-add-to-cart-btn');
    const orderConfirmBtn = document.getElementById('order-confirm-btn');

    if (cartOpenBtn) cartOpenBtn.onclick = () => {
        renderCartList();
        document.getElementById('cart-modal').style.display = 'block';
    };

    if (cartCloseBtn) cartCloseBtn.onclick = () => {
        document.getElementById('cart-modal').style.display = 'none';
    };

    if (optAddToCartBtn) optAddToCartBtn.onclick = confirmAddToCart;

    if (orderConfirmBtn) orderConfirmBtn.onclick = () => {
        if (cart.length === 0) return alert("カートが空です");
        alert("注文を確定しました！");
        cart = [];
        saveCart();
        updateCartCount();
        document.getElementById('cart-modal').style.display = 'none';
    };
}

// 5. カート追加・オプション関連
window.addToCart = function(id) {
    selectedProduct = menuData.find(p => p.id === id);
    if (!selectedProduct) return;

    const optionModal = document.getElementById('option-modal');
    const nameLabel = document.getElementById('opt-product-name');
    const container = document.getElementById('opt-list-container');
    
    if (nameLabel) nameLabel.innerText = selectedProduct.name;
    
    if (container) {
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
    }
    
    if (optionModal) optionModal.style.display = 'block';
};

window.closeOptionModal = function() {
    const optionModal = document.getElementById('option-modal');
    if (optionModal) optionModal.style.display = 'none';
};

function confirmAddToCart() {
    const checkboxes = document.querySelectorAll('.opt-checkbox');
    const selectedOptions = [];
    let extraPrice = 0;

    checkboxes.forEach(cb => {
        if (cb.checked) {
            const optIndex = parseInt(cb.getAttribute('data-index'));
            const option = selectedProduct.options[optIndex];
            selectedOptions.push(option.name);
            extraPrice += option.price;
        }
    });

    const cartItem = {
        ...selectedProduct,
        displayPrice: selectedProduct.price + extraPrice,
        selectedOptions: selectedOptions
    };

    cart.push(cartItem);
    saveCart();
    updateCartCount();
    closeOptionModal();
}

// 6. ユーティリティ
function saveCart() {
    localStorage.setItem('GoodUI_Cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCountLabel = document.getElementById('cart-count');
    if (cartCountLabel) cartCountLabel.innerText = cart.length;
}

function renderCartList() {
    const list = document.getElementById('cart-items-list');
    const totalLabel = document.getElementById('total-price');
    
    if (!list) return;

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

    const total = cart.reduce((sum, item) => sum + (item.displayPrice || item.price), 0);
    if (totalLabel) totalLabel.innerText = `合計: 税込 ${total}円`;
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCartList();
};