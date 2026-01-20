// ==========================================
// 1. データ定義 & 初期設定
// ==========================================
const DRINK_SET_IDS = [111, 131, 132, 141];

const OPT_GROUPS = {
    sweets: [{name: "ドリンクセット", price: 300, isSet: true}, {name: "なし", price: 0}],
    d110: [{name: "ガムシロップ", price: 0}, {name: "ミルク", price: 0}],
    d120: [{name: "砂糖", price: 0}, {name: "ミルク", price: 0}, {name: "ホイップ追加", price: 100}],
    d130: [{name: "砂糖", price: 0}, {name: "レモン", price: 0}],
    d140: [{name: "氷なし", price: 0}],
    d150: [{name: "ストローあり", price: 0}, {name: "氷なし", price: 0}],
    snack: [{name: "ドリンクセット", price: 300, isSet: true}, {name: "パンをあたためる", price: 0}],
    dessert: [{name: "ドリンクセット", price: 300, isSet: true}, {name: "食後", price: 0}, {name: "お料理と一緒に", price: 0}],
    morning: [{name: "ドリンク選択", price: 0, isSet: true, required: true}]
};

const menuData = [
    { id: 1, mainCategory: "期間限定スイーツ", category: "今月のイチオシ！", name: "贅沢イチゴのケーキ", price: 800, image: "images/贅沢イチゴのケーキ.png" },
    { id: 2, mainCategory: "期間限定スイーツ", category: "今月のイチオシ！", name: "かぼちゃケーキ", price: 700, image: "images/かぼちゃケーキ.png" },
    { id: 111, mainCategory: "ドリンク", category: "アイスコーヒー", name: "ブレンドコーヒー", price: 550, image: "images/ブレンドコーヒー.png" },
    { id: 112, mainCategory: "ドリンク", category: "アイスコーヒー", name: "アイスカフェオレ", price: 650, image: "images/カフェオレ.png" },
    { id: 121, mainCategory: "ドリンク", category: "ホットコーヒー", name: "ブレンドコーヒー", price: 500, image: "images/ブレンドコーヒー.png" },
    { id: 122, mainCategory: "ドリンク", category: "ホットコーヒー", name: "アメリカーノ", price: 600, image: "images/アメリカーノ.png" },
    { id: 131, mainCategory: "ドリンク", category: "紅茶", name: "ミルクティー", price: 500, image: "images/ミルクティー.png" },
    { id: 132, mainCategory: "ドリンク", category: "紅茶", name: "ダージリン", price: 500, image: "images/ダージリン.png" },
    { id: 141, mainCategory: "ドリンク", category: "ソフトドリンク", name: "オレンジジュース", price: 400, image: "images/オレンジジュース.png" },
    { id: 142, mainCategory: "ドリンク", category: "ソフトドリンク", name: "コーラ", price: 400, image: "images/コーラ.png" },
    { id: 151, mainCategory: "ドリンク", category: "お子様用ドリンク", name: "アップルジュース", price: 300, image: "images/オレンジジュース.png" },
    { id: 152, mainCategory: "ドリンク", category: "お子様用ドリンク", name: "ぶどうジュース", price: 300, image: "images/オレンジジュース.png" },
    { id: 211, mainCategory: "軽食", category: "サンドイッチ", name: "BLTサンド", price: 700, image: "images/BLTサンド.png" },
    { id: 213, mainCategory: "軽食", category: "サンドイッチ", name: "ハムチーズサンド", price: 650, image: "images/ハムチーズサンド.png"},
    { id: 212, mainCategory: "軽食", category: "サンドイッチ", name: "たまごサンド", price: 600, image: "images/たまごサンド.png" },
    { id: 221, mainCategory: "軽食", category: "トースト・パン", name: "ピザトースト", price: 650, image: "images/ピザトースト.png" },
    { id: 222, mainCategory: "軽食", category: "トースト・パン", name: "トースト", price: 450, image: "images/トースト.png"},
    { id: 223, mainCategory: "軽食", category: "トースト・パン", name: "クロワッサン", price: 400, image: "images/クロワッサン.png",},
    { id: 311, mainCategory: "デザート", category: "ケーキ", name: "チーズケーキ", price: 600, image: "images/チーズケーキ.png" },
    { id: 312, mainCategory: "デザート", category: "ケーキ", name: "贅沢イチゴのケーキ", price: 800, image: "images/贅沢イチゴのケーキ.png"},
    { id: 313, mainCategory: "デザート", category: "ケーキ", name: "かぼちゃケーキ", price: 700, image: "images/かぼちゃケーキ.png"},
    { id: 321, mainCategory: "デザート", category: "パフェ", name: "チョコパフェ", price: 850, image: "images/チョコパフェ.png"},
    { id: 322, mainCategory: "デザート", category: "パフェ", name: "抹茶パフェ", price: 850, image: "images/抹茶パフェ.png"},
    { id: 401, mainCategory: "モーニング", category: "モーニング", name: "モーニングトーストセット", price: 500, image: "images/モーニングトーストセット.png" },
    { id: 402, mainCategory: "モーニング", category: "モーニング", name: "モーニングプレート", price: 700, image: "images/モーニングプレート.png"}
];

menuData.forEach(item => {
    if (item.id >= 1 && item.id <= 99) item.options = OPT_GROUPS.sweets;
    else if (item.id >= 110 && item.id < 120) item.options = OPT_GROUPS.d110;
    else if (item.id >= 120 && item.id < 130) item.options = OPT_GROUPS.d120;
    else if (item.id >= 130 && item.id < 140) item.options = OPT_GROUPS.d130;
    else if (item.id >= 140 && item.id < 150) item.options = OPT_GROUPS.d140;
    else if (item.id >= 150 && item.id < 200) item.options = OPT_GROUPS.d150;
    else if (item.id >= 200 && item.id < 300) item.options = OPT_GROUPS.snack;
    else if (item.id >= 300 && item.id < 400) item.options = OPT_GROUPS.dessert;
    else if (item.id >= 400) item.options = OPT_GROUPS.morning;
});

const categoryMap = {
    "期間限定スイーツ": ["今月のイチオシ！"],
    "ドリンク": ["アイスコーヒー", "ホットコーヒー", "紅茶", "ソフトドリンク", "お子様用ドリンク"],
    "軽食": ["サンドイッチ", "トースト・パン"],
    "デザート": ["ケーキ", "パフェ"],
    "モーニング": ["モーニング"]
};

// ==========================================
// 2. 状態管理
// ==========================================
let cart = JSON.parse(localStorage.getItem('GoodUI_Cart')) || [];
let orderHistory = []; 
let selectedProduct = null;
let currentMain = "ドリンク";
let currentSub = "アイスコーヒー";
let currentPage = 0; 
const ITEMS_PER_PAGE = 2; 

let currentStep = 1;
let selectedOptions = [];
let selectedDrinkId = null;
let currentQty = 1;

// ==========================================
// 3. 初期化 & メニュー制御
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderSubCategoryBar(); renderMenu(); updateCartCount(); setupEventListeners();
});

window.changeMainCategory = function(mainCat, element) {
    currentMain = mainCat; currentPage = 0;
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');
    const subCats = categoryMap[mainCat];
    currentSub = (subCats && subCats.length > 0) ? subCats[0] : "";
    renderSubCategoryBar(); renderMenu();
};

function renderSubCategoryBar() {
    const subBar = document.querySelector('.category-sub');
    if (!subBar) return;
    const subCats = categoryMap[currentMain];
    if (!subCats || subCats.length === 0) {
        subBar.innerHTML = ""; subBar.style.display = "none"; return;
    }
    subBar.style.display = "flex";
    subBar.innerHTML = subCats.map(cat => `<div class="sub-item ${cat === currentSub ? 'active' : ''}" onclick="changeSubCategory('${cat}', this)">${cat}</div>`).join('');
}

window.changeSubCategory = function(subCat, element) {
    currentSub = subCat; currentPage = 0;
    document.querySelectorAll('.sub-item').forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');
    renderMenu();
};

function renderMenu() {
    const grid = document.getElementById('menu-grid');
    const controls = document.getElementById('pagination-controls');
    if (!grid || !controls) return;
    const filtered = menuData.filter(item => item.mainCategory === currentMain && (currentSub === "" || item.category === currentSub));
    const items = filtered.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

    grid.innerHTML = items.map(item => `
        <div class="card" onclick="addToCart(${item.id})">
            <img src="${item.image}" alt="${item.name}">
            <div class="card-info"><div class="card-title">${item.name}</div><div class="card-price">税込 ${item.price}円</div></div>
        </div>`).join('');

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    controls.innerHTML = `
        <button class="page-btn" ${currentPage === 0 ? 'disabled' : ''} onclick="movePage(-1)">◀ 前</button>
        <span style="font-weight:bold;">${currentPage + 1} / ${totalPages}</span>
        <button class="page-btn" ${currentPage >= totalPages - 1 ? 'disabled' : ''} onclick="movePage(1)">次 ▶</button>`;
}

window.movePage = (step) => { currentPage += step; renderMenu(); };

// ==========================================
// 4. オプションモーダル (トグル選択 & 2ステップ)
// ==========================================
window.addToCart = function(id) {
    selectedProduct = menuData.find(p => p.id === id);
    if (!selectedProduct) return;
    currentStep = 1; selectedOptions = []; selectedDrinkId = null; currentQty = 1;
    renderOptionModal();
    document.getElementById('option-modal').style.display = 'block';
};

function renderOptionModal() {
    const container = document.getElementById('opt-list-container');
    const footer = document.getElementById('opt-modal-footer');
    document.getElementById('opt-product-name').innerText = selectedProduct.name;

    if (currentStep === 1) {
        const setOption = selectedProduct.options.find(o => o.isSet);
        const otherOptions = selectedProduct.options.filter(o => !o.isSet && o.name !== "なし");
        let contentHtml = "";

        if (setOption) {
            const drinks = menuData.filter(m => DRINK_SET_IDS.includes(m.id));
            contentHtml += `
                <div class="drink-set-selection-box">
                    <div class="set-label">+${setOption.price}円でドリンクセットはいかがですか？</div>
                    <div class="drink-card-row">
                        ${drinks.map(d => `
                            <div class="drink-card-small ${selectedDrinkId === d.id ? 'selected' : ''}" onclick="selectDrink(${d.id})">
                                <img src="${d.image}"><p>${d.name}</p>
                            </div>`).join('')}
                    </div>
                </div>`;
        }

        contentHtml += otherOptions.map(opt => `
            <div class="opt-toggle-row" onclick="toggleOptionByObject('${opt.name}')">
                <span>${opt.name}</span>
                <input type="checkbox" ${selectedOptions.some(o => o.name === opt.name) ? 'checked' : ''} style="pointer-events:none">
            </div>`).join('');

        container.innerHTML = contentHtml;
        footer.innerHTML = `<button class="opt-btn-cancel" onclick="closeOptionModal()">キャンセル</button>
                            <button class="opt-btn-add" id="next-btn" onclick="changeStep(2)">次へ</button>`;
        validateStep1();
    } else {
        const drink = selectedDrinkId ? menuData.find(m => m.id === selectedDrinkId).name : "";
        container.innerHTML = `
            <div class="step2-container">
                <div class="step2-left"><img src="${selectedProduct.image}"></div>
                <div class="step2-right">
                    <div style="font-weight:bold; font-size:1.4em;">${selectedProduct.name}</div>
                    <div class="step2-opt-summary">${selectedOptions.map(o => o.name).join(', ')}${drink ? '<br>セット: ' + drink : ''}</div>
                </div>
            </div>
            <div class="qty-control-area">
                <button class="qty-btn" onclick="updateQty(-1)">－</button><span class="qty-display">${currentQty}</span><button class="qty-btn" onclick="updateQty(1)">＋</button>
            </div>`;
        footer.innerHTML = `<button class="opt-btn-cancel" onclick="changeStep(1)">戻る</button>
                            <button class="opt-btn-add" onclick="finalizeAddToCart()">カートに追加</button>`;
    }
}

window.selectDrink = function(id) {
    const setOpt = selectedProduct.options.find(o => o.isSet);
    if (selectedDrinkId === id) {
        selectedDrinkId = null;
        if (setOpt) selectedOptions = selectedOptions.filter(o => o !== setOpt);
    } else {
        selectedDrinkId = id;
        if (setOpt && !selectedOptions.includes(setOpt)) selectedOptions.push(setOpt);
    }
    renderOptionModal();
};

window.toggleOptionByObject = function(name) {
    const opt = selectedProduct.options.find(o => o.name === name);
    if (!opt) return;
    if (selectedOptions.some(o => o.name === name)) selectedOptions = selectedOptions.filter(o => o.name !== name);
    else selectedOptions.push(opt);
    renderOptionModal();
};

window.changeStep = (s) => { currentStep = s; renderOptionModal(); };
window.updateQty = (v) => { currentQty = Math.max(1, currentQty + v); renderOptionModal(); };

function validateStep1() {
    const btn = document.getElementById('next-btn');
    if (!btn) return;
    const isMorning = selectedProduct.id >= 400;
    const isValid = isMorning ? !!selectedDrinkId : true;
    btn.disabled = !isValid; btn.style.opacity = isValid ? "1" : "0.5";
}

// ==========================================
// 5. カート & 履歴アクション
// ==========================================
window.finalizeAddToCart = function() {
    const extra = selectedOptions.reduce((sum, o) => sum + o.price, 0);
    cart.push({ ...selectedProduct, displayPrice: selectedProduct.price + extra, qty: currentQty, 
                selectedOptions: selectedOptions.map(o => o.name), setDrinkName: selectedDrinkId ? menuData.find(m => m.id === selectedDrinkId).name : null });
    localStorage.setItem('GoodUI_Cart', JSON.stringify(cart));
    updateCartCount(); closeOptionModal();
};

function updateCartCount() {
    const label = document.getElementById('cart-count');
    const btn = document.getElementById('cart-open-btn');
    const total = cart.reduce((s, i) => s + i.qty, 0);
    if (label) label.innerText = total;
    if (btn) {
        if (cart.length > 0) {
            btn.classList.add('active'); btn.onclick = () => { renderCartList(); document.getElementById('cart-modal').style.display = 'block'; };
        } else {
            btn.classList.remove('active'); btn.onclick = null;
        }
    }
}

function renderCartList() {
    const list = document.getElementById('cart-items-list');
    const confirmBtn = document.getElementById('order-confirm-btn');
    if (!list || !confirmBtn) return;
    if (cart.length === 0) {
        list.innerHTML = "<p style='text-align:center; padding:50px;'>カートは空です</p>"; confirmBtn.disabled = true;
    } else {
        let html = `<div class="cart-header"><div style="grid-column: span 2;">商品</div><div style="text-align:center;">単価</div><div style="text-align:center;">数量</div><div></div></div>`;
        html += cart.map((item, idx) => `
            <div class="cart-item-row">
                <img src="${item.image}" class="cart-item-img">
                <div class="cart-item-info"><div class="cart-item-name">${item.name}</div><div class="cart-item-options">${item.selectedOptions.join(', ')}${item.setDrinkName ? ' / セット: ' + item.setDrinkName : ''}</div></div>
                <div class="cart-item-price">¥${item.displayPrice}</div><div class="cart-item-qty">${item.qty}</div>
                <div class="cart-item-actions"><button class="cart-btn-delete" onclick="removeFromCart(${idx})">削除</button></div>
            </div>`).join('');
        list.innerHTML = html;
        const total = cart.reduce((s, i) => s + (i.displayPrice * i.qty), 0);
        confirmBtn.innerHTML = `¥${total.toLocaleString()} 注文を確定する`;
        confirmBtn.disabled = false; confirmBtn.style.opacity = "1";
    }
}

window.removeFromCart = function(idx) {
    cart.splice(idx, 1); localStorage.setItem('GoodUI_Cart', JSON.stringify(cart));
    updateCartCount(); renderCartList();
};

// ==========================================
// 6. サイドバー & お会計共通処理
// ==========================================
function processCheckout() {
    const total = orderHistory.reduce((s, i) => s + (i.displayPrice * i.qty), 0);
    if (total === 0) { alert("注文履歴がありません。"); return; }
    alert(`合計 ¥${total.toLocaleString()} です。レジへお越しください。`);
}

function openHistoryModal() {
    const list = document.getElementById('history-items-list');
    const totalDisplay = document.getElementById('history-total-amount');
    const checkoutBtn = document.getElementById('history-to-checkout-btn');
    if (!list) return;

    if (orderHistory.length === 0) {
        list.innerHTML = "<p style='text-align:center; padding:50px;'>履歴はありません</p>";
        if (totalDisplay) totalDisplay.innerText = "合計 ¥0 (税込)";
        if (checkoutBtn) checkoutBtn.style.display = "none";
    } else {
        let html = `<div class="cart-header" style="background-color: #555;"><div style="grid-column: span 2;">商品</div><div style="text-align:center;">単価</div><div style="text-align:center;">数量</div><div style="text-align:center;">時刻</div></div>`;
        html += orderHistory.map(i => `
            <div class="cart-item-row">
                <img src="${i.image}" class="cart-item-img">
                <div class="cart-item-info"><div class="cart-item-name">${i.name}</div><div class="cart-item-options">${i.selectedOptions.join(', ')}${i.setDrinkName ? ' / セット: ' + i.setDrinkName : ''}</div></div>
                <div class="cart-item-price">¥${i.displayPrice.toLocaleString()}</div><div class="cart-item-qty">${i.qty}</div>
                <div style="text-align:center; font-size: 0.8em; color: #666;">${i.orderedAt}</div>
            </div>`).join('');
        list.innerHTML = html;
        const total = orderHistory.reduce((s, i) => s + (i.displayPrice * i.qty), 0);
        if (totalDisplay) totalDisplay.innerText = `合計 ¥${total.toLocaleString()} (税込)`;
        if (checkoutBtn) checkoutBtn.style.display = "flex";
    }
    document.getElementById('history-modal').style.display = 'block';
}

function setupEventListeners() {
    document.getElementById('order-confirm-btn').onclick = () => {
        if (cart.length === 0) return;
        const now = new Date(); const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        cart.forEach(i => orderHistory.push({ ...i, orderedAt: time }));
        alert("注文を確定しました！");
        const hBtn = document.getElementById('history-btn');
        if (hBtn) { hBtn.classList.add('btn-history-active'); hBtn.classList.remove('disabled'); hBtn.onclick = openHistoryModal; }
        const cBtn = document.getElementById('checkout-btn');
        if (cBtn) { cBtn.classList.add('btn-checkout-active'); cBtn.classList.remove('disabled'); cBtn.onclick = processCheckout; }
        cart = []; localStorage.removeItem('GoodUI_Cart'); updateCartCount(); document.getElementById('cart-modal').style.display = 'none';
    };

    const callBtn = document.querySelector('.btn-call');
    if (callBtn) callBtn.onclick = () => alert("店員を呼び出しました。");

    const historyCheckoutBtn = document.getElementById('history-to-checkout-btn');
    if (historyCheckoutBtn) historyCheckoutBtn.onclick = () => { closeHistoryModal(); processCheckout(); };

    document.getElementById('cart-close-btn').onclick = () => document.getElementById('cart-modal').style.display = 'none';
}

window.closeOptionModal = () => document.getElementById('option-modal').style.display = 'none';
window.closeHistoryModal = () => document.getElementById('history-modal').style.display = 'none';