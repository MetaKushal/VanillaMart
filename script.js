// ==========================================
// 1. STATE (Our Expanded Database)
// ==========================================
// ==========================================
// 1. STATE (Our Expanded Database)
// ==========================================
const products = [
    // Dairy
    { id: 1, name: "Amul Butter (100g)", price: 58, category: "Dairy", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=200&q=80" },
    { id: 7, name: "Farm Fresh Eggs (6 pcs)", price: 50, category: "Dairy", image: "https://images.unsplash.com/photo-1587486913049-53fc88980cb2?auto=format&fit=crop&w=200&q=80" },
    { id: 9, name: "Amul Taaza Milk (1L)", price: 68, category: "Dairy", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=200&q=80" },
    { id: 10, name: "Britannia Cheese Slices", price: 120, category: "Dairy", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=200&q=80" },
    { id: 11, name: "Mother Dairy Paneer", price: 85, category: "Dairy", image: "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=200&q=80" },
    // Snacks
    { id: 2, name: "Maggi 2-Minute Noodles", price: 14, category: "Snacks", image: "https://images.unsplash.com/photo-1612929633738-8fe01f7c8166?auto=format&fit=crop&w=200&q=80" },
    { id: 4, name: "Lays Magic Masala", price: 20, category: "Snacks", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=200&q=80" },
    { id: 12, name: "Kurkure Solid Masti", price: 20, category: "Snacks", image: "https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?auto=format&fit=crop&w=200&q=80" },
    { id: 13, name: "Oreo Original (120g)", price: 35, category: "Snacks", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=200&q=80" },
    { id: 14, name: "Haldiram's Bhujia", price: 55, category: "Snacks", image: "https://images.unsplash.com/photo-1604085792782-8d92f276d7d8?auto=format&fit=crop&w=200&q=80" },
    // Produce
    { id: 3, name: "Fresh Tomatoes (500g)", price: 40, category: "Produce", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80" },
    { id: 6, name: "Aashirvaad Atta (5kg)", price: 210, category: "Produce", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80" },
    { id: 15, name: "Onions (1kg)", price: 30, category: "Produce", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=200&q=80" },
    { id: 16, name: "Potatoes (1kg)", price: 25, category: "Produce", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=200&q=80" },
    { id: 17, name: "Fresh Bananas (6 pcs)", price: 40, category: "Produce", image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=200&q=80" },
    // Beverages
    { id: 5, name: "Thums Up (750ml)", price: 40, category: "Beverages", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80" },
    { id: 8, name: "Cold Coffee Can", price: 60, category: "Beverages", image: "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=200&q=80" },
    { id: 18, name: "Red Bull Energy Drink", price: 115, category: "Beverages", image: "https://images.unsplash.com/photo-1614316656123-5e91e6b8c4c7?auto=format&fit=crop&w=200&q=80" },
    { id: 19, name: "Real Tropicana Juice", price: 105, category: "Beverages", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=200&q=80" },
    { id: 20, name: "Bisleri Water (1L)", price: 20, category: "Beverages", image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=200&q=80" }
];

// Check browser memory for a saved cart. If empty, start a new array.
let cart = JSON.parse(localStorage.getItem("quickMartCart")) || [];

// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const productGrid = document.getElementById("product-grid");
const sortDropdown = document.getElementById("sort-dropdown");
const cartItemsList = document.getElementById("cart-items-list");

// Navigation Elements
const storeView = document.getElementById("store-view");
const cartView = document.getElementById("cart-view");
const cartNavBtn = document.getElementById("cart-nav-btn");
const backToStoreBtn = document.getElementById("back-to-store");
const navHome = document.getElementById("nav-home");
const navCartBtn = document.getElementById("nav-cart-btn");

// Search Overlay Elements
const navSearchBtn = document.getElementById("nav-search");
const searchOverlay = document.getElementById("mobile-search-overlay");
const searchInput = document.getElementById("mobile-search-input");
const closeSearch = document.getElementById("close-search");
const searchResults = document.getElementById("search-results-container");

// ==========================================
// 3. CORE LOGIC & RENDERING
// ==========================================
function renderProducts() {
    productGrid.innerHTML = "";
    const categories = [...new Set(products.map(p => p.category))];

    categories.forEach(category => {
        let itemsInCategory = products.filter(p => p.category === category);
        const currentSort = sortDropdown ? sortDropdown.value : "default";

        if (currentSort === "price-low") {
            itemsInCategory.sort((a, b) => a.price - b.price);
        } else if (currentSort === "price-high") {
            itemsInCategory.sort((a, b) => b.price - a.price);
        } else if (currentSort === "name-a-z") {
            itemsInCategory.sort((a, b) => a.name.localeCompare(b.name));
        }

        const section = document.createElement("div");
        section.classList.add("category-section");
        section.innerHTML = `
            <div class="category-heading">
                ${category} <span>See All ></span>
            </div>
        `;

        const scrollContainer = document.createElement("div");
        scrollContainer.classList.add("horizontal-scroll");

        itemsInCategory.forEach((product) => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img-tag">
                <div class="product-title">${product.name}</div>
                <div class="product-price">₹${product.price}</div>
                <button class="add-btn" onclick="addToCart(${product.id})">ADD</button>
            `;
            scrollContainer.appendChild(card);
        });

        section.appendChild(scrollContainer);
        productGrid.appendChild(section);
    });
}

// ==========================================
// 4. CART & BILLING ENGINE
// ==========================================
function addToCart(productId) {
    const productToAdd = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...productToAdd, quantity: 1 });
    }
    updateCartCount();
    saveCart();
}

function updateCartCount() {
    const countSpan = document.getElementById("cart-count");
    const mobileCountSpan = document.getElementById("mobile-cart-count");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (countSpan) countSpan.innerText = totalItems;
    if (mobileCountSpan) mobileCountSpan.innerText = totalItems;
}

function increaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartCount();
        renderCart();
        saveCart();
    }
}

function decreaseQuantity(productId) {
    const itemIndex = cart.findIndex(i => i.id === productId);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        updateCartCount();
        renderCart();
        saveCart();
    }
}

function renderCart() {
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
        cartItemsList.innerHTML = `<div style="padding: 20px; color: var(--text-muted);">Your bag is empty! Let's add some snacks.</div>`;
        calculateTotals();
        return;
    }

    cart.forEach((item) => {
        const itemRow = document.createElement('div');
        itemRow.style.display = "flex";
        itemRow.style.justifyContent = "space-between";
        itemRow.style.padding = '15px 0';
        itemRow.style.borderBottom = '1px solid var(--border)';

        itemRow.innerHTML = `
            <div style="display: flex; gap: 15px; align-items: center;">
                <!-- ✨ HERE IS THE IMAGE TAG ✨ -->
                <img src="${item.image}" alt="${item.name}" class="product-img-tag" style="width: 50px; height: 50px;">
                
                <div>
                    <div style="font-weight: 600; color: var(--text-main);">${item.name}</div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
                        <button onclick="decreaseQuantity(${item.id})" style="padding: 2px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg-color); cursor: pointer; font-weight: bold;">-</button>
                        <span style="font-size: 0.9rem; font-weight: 600;">${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})" style="padding: 2px 10px; border-radius: 6px; border: none; background: var(--primary); color: #064E3B; cursor: pointer; font-weight: bold;">+</button>
                    </div>
                </div>
            </div>
            <div style="font-weight: 600; color: var(--text-main); display: flex; align-items: center;">
                ₹${item.price * item.quantity}
            </div>
        `;
        cartItemsList.appendChild(itemRow);
    });

    calculateTotals();
}
// ✨ NEW: Saves the current cart to the browser's memory
function saveCart() {
    localStorage.setItem("quickMartCart", JSON.stringify(cart));
}

function calculateTotals() {
    const subtotalSpan = document.getElementById("subtotal");
    const totalSpan = document.getElementById("total");
    const taxSpan = document.getElementById("tax");

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    if (subtotalSpan) subtotalSpan.innerText = `₹${subtotal.toFixed(2)}`;
    if (taxSpan) taxSpan.innerText = `₹${tax.toFixed(2)}`;
    if (totalSpan) totalSpan.innerText = `₹${total.toFixed(2)}`;
}

// ==========================================
// 5. UTILITIES (Toast Notifications)
// ==========================================
function showToast(message) {
    let toast = document.getElementById("app-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "app-toast";
        toast.style.cssText = `
            position: fixed; top: -100px; left: 50%; transform: translateX(-50%);
            background: #064E3B; color: #A7F3D0; padding: 12px 24px;
            border-radius: 8px; font-weight: 600; font-size: 0.95rem;
            z-index: 9999; transition: top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2); white-space: nowrap;
        `;
        document.body.appendChild(toast);
    }

    toast.innerText = message;
    toast.style.top = "20px";

    setTimeout(() => {
        toast.style.top = "-100px";
    }, 2500);
}

// ==========================================
// 6. EVENT LISTENERS
// ==========================================

// Sorting
if (sortDropdown) sortDropdown.addEventListener("change", renderProducts);

// SPA Navigation (Desktop)
if (cartNavBtn) {
    cartNavBtn.addEventListener("click", () => {
        storeView.classList.remove("active");
        storeView.classList.add("hidden");
        cartView.classList.remove("hidden");
        cartView.classList.add("active");
        renderCart();
    });
}

if (backToStoreBtn) {
    backToStoreBtn.addEventListener("click", () => {
        cartView.classList.remove("active");
        cartView.classList.add("hidden");
        storeView.classList.remove("hidden");
        storeView.classList.add("active");
    });
}

// SPA Navigation (Mobile App Bottom Nav)
if (navHome) {
    navHome.addEventListener("click", () => {
        if (storeView.classList.contains("active")) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return; // Stop the rest of the function from running
        }
        cartView.classList.remove("active");
        cartView.classList.add("hidden");
        storeView.classList.remove("hidden");
        storeView.classList.add("active");

        navHome.classList.add("active");
        if (navCartBtn) navCartBtn.classList.remove("active");
    });
}

if (navCartBtn) {
    navCartBtn.addEventListener("click", () => {
        storeView.classList.remove("active");
        storeView.classList.add("hidden");
        cartView.classList.remove("hidden");
        cartView.classList.add("active");

        navCartBtn.classList.add("active");
        if (navHome) navHome.classList.remove("active");
        renderCart();
    });
}

// iOS Search Overlay Logic
if (navSearchBtn) {
    navSearchBtn.addEventListener("click", () => {
        searchOverlay.classList.remove("hidden");
        searchInput.focus();
    });
}

if (closeSearch) {
    closeSearch.addEventListener("click", () => {
        searchOverlay.classList.add("hidden");
        searchInput.value = "";
        searchResults.innerHTML = "";
    });
}

if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        searchResults.innerHTML = "";

        if (query.trim() === "") return;
        const matches = products.filter(p => p.name.toLowerCase().includes(query));

        matches.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("search-result-item");

            div.innerHTML = `
                <div style="display:flex; align-items:center; gap:15px;">
                    <!-- ✨ HERE IS THE IMAGE TAG ✨ -->
                    <img src="${product.image}" alt="${product.name}" class="product-img-tag" style="width: 40px; height: 40px; margin: 0;">
                    
                    <div>
                        <div style="font-weight:600; color:var(--text-main);">${product.name}</div>
                        <div style="color:var(--text-muted); font-size:0.9rem;">₹${product.price}</div>
                    </div>
                </div>
            `;

            const addBtn = document.createElement("button");
            addBtn.type = "button";
            addBtn.innerText = "ADD";
            addBtn.style.cssText = "padding: 8px 15px; background: var(--primary); border:none; border-radius:6px; font-weight:bold; color:#064E3B; cursor:pointer;";

            addBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                addToCart(product.id);
                // searchOverlay.classList.add("hidden"); 
                // searchInput.value = ""; 
                // searchResults.innerHTML = ""; 
                showToast(`Added ${product.name} to bag!`);
            });

            div.appendChild(addBtn);
            searchResults.appendChild(div);
        });
    });
}

// ==========================================
// 7. KICKOFF
// ==========================================
renderProducts();
updateCartCount();