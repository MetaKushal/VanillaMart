// 1. STATE (Our Data)
const products = [
    { id: 1, name: "Amul Butter (100g)", price: 58, category: "Dairy", image: "🧈" },
    { id: 2, name: "Maggi 2-Minute Noodles", price: 14, category: "Snacks", image: "🍜" },
    { id: 3, name: "Fresh Tomatoes (500g)", price: 40, category: "Produce", image: "🍅" },
    { id: 4, name: "Lays Magic Masala", price: 20, category: "Snacks", image: "🥔" },
    { id: 5, name: "Thums Up (750ml)", price: 40, category: "Beverages", image: "🥤" },
    { id: 6, name: "Aashirvaad Atta (5kg)", price: 210, category: "Produce", image: "🌾" },
    { id: 7, name: "Farm Fresh Eggs (6 pcs)", price: 50, category: "Dairy", image: "🥚" },
    { id: 8, name: "Cold Coffee Can", price: 60, category: "Beverages", image: "☕" }
];

let cart = []; // Starts empty

// 2. DOM ELEMENTS
const productGrid = document.getElementById("product-grid");

// 3. LOGIC & RENDERING
function renderProducts() {
    productGrid.innerHTML = "";

    products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <div class="product-img">${product.image}</div>
            <div class="product-title">${product.name}</div>
            <div class="product-price">₹${product.price}</div>
            <button class="add-btn" onclick="addToCart(${product.id})">ADD</button>
        `;

        productGrid.appendChild(card);
    });
}

// 4. CART ENGINE / LOGIC
function addToCart(productId) {
    const productToAdd = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...productToAdd, quantity: 1 });
    }

    updateCartCount();
}

function updateCartCount() {
    const countSpan = document.getElementById("cart-count");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countSpan.innerText = totalItems;
}

// 5. NAVIGATION LOGIC (SPA)
const storeView = document.getElementById("store-view");
const cartView = document.getElementById("cart-view");
const cartNavBtn = document.getElementById("cart-nav-btn");
const backToStoreBtn = document.getElementById("back-to-store");

cartNavBtn.addEventListener("click", () => {
    storeView.classList.remove("active");
    storeView.classList.add("hidden");

    cartView.classList.remove("hidden");
    cartView.classList.add("active");

    renderCart();
});

backToStoreBtn.addEventListener("click", () => {
    cartView.classList.remove("active");
    cartView.classList.add("hidden");

    storeView.classList.remove("hidden");
    storeView.classList.add("active");
});

// 6. RENDER CART PAGE
const cartItemsList = document.getElementById("cart-items-list");

function renderCart() {
    cartItemsList.innerHTML = "";

    // Empty state (Fixed missing semicolon)
    if(cart.length === 0){
        cartItemsList.innerHTML= `<div style="padding: 20px; color: var(--text-muted);">Your bag is empty! Let's add some snacks.</div>`;
        calculateTotals();
        return;
    }

    // Loop through cart and build html for each item
    cart.forEach((item) => {
        const itemRow = document.createElement('div');

        itemRow.style.display = "flex";
        itemRow.style.justifyContent = "space-between";
        itemRow.style.padding = '15px 0';
        itemRow.style.borderBottom = '1px solid var(--border)';

        itemRow.innerHTML=`
            <div style="display: flex; gap: 15px; align-items: center;">
                <span style="font-size: 2rem;">${item.image}</span>
                <div>
                    <div style="font-weight: 600; color: var(--text-main);">${item.name}</div>
                    <div style="color: var(--text-muted); font-size: 0.85rem;">Qty: ${item.quantity}</div>
                </div>
            </div>
            <div style="font-weight: 600; color: var(--text-main);">
                ₹${item.price * item.quantity}
            </div>
        `;
        cartItemsList.appendChild(itemRow);
    });
    
    calculateTotals();
}

// 7. CHECKOUT LOGIC MATH
function calculateTotals() {
    const subtotalSpan = document.getElementById("subtotal");
    const totalSpan = document.getElementById("total");
    const taxSpan = document.getElementById("tax");

    // Add up for every item
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // GST 5%
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    // Fixed: Update all three fields on the screen!
    subtotalSpan.innerText = `₹${subtotal.toFixed(2)}`;
    taxSpan.innerText = `₹${tax.toFixed(2)}`;
    totalSpan.innerText = `₹${total.toFixed(2)}`;
}

// Kickoff the app
renderProducts();