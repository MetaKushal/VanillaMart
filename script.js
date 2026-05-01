// ==========================================
// 1. STATE (Our Expanded Database)
// ==========================================
const products = [
    // Dairy
    { id: 1, name: "Amul Butter (100g)", price: 58, category: "Dairy", image: "🧈" },
    { id: 7, name: "Farm Fresh Eggs (6 pcs)", price: 50, category: "Dairy", image: "🥚" },
    { id: 9, name: "Amul Taaza Milk (1L)", price: 68, category: "Dairy", image: "🥛" },
    { id: 10, name: "Britannia Cheese Slices", price: 120, category: "Dairy", image: "🧀" },
    { id: 11, name: "Mother Dairy Paneer", price: 85, category: "Dairy", image: "🧊" },
    // Snacks
    { id: 2, name: "Maggi 2-Minute Noodles", price: 14, category: "Snacks", image: "🍜" },
    { id: 4, name: "Lays Magic Masala", price: 20, category: "Snacks", image: "🥔" },
    { id: 12, name: "Kurkure Solid Masti", price: 20, category: "Snacks", image: "🌶️" },
    { id: 13, name: "Oreo Original (120g)", price: 35, category: "Snacks", image: "🍪" },
    { id: 14, name: "Haldiram's Bhujia", price: 55, category: "Snacks", image: "🥣" },
    // Produce
    { id: 3, name: "Fresh Tomatoes (500g)", price: 40, category: "Produce", image: "🍅" },
    { id: 6, name: "Aashirvaad Atta (5kg)", price: 210, category: "Produce", image: "🌾" },
    { id: 15, name: "Onions (1kg)", price: 30, category: "Produce", image: "🧅" },
    { id: 16, name: "Potatoes (1kg)", price: 25, category: "Produce", image: "🥔" },
    { id: 17, name: "Fresh Bananas (6 pcs)", price: 40, category: "Produce", image: "🍌" },
    // Beverages
    { id: 5, name: "Thums Up (750ml)", price: 40, category: "Beverages", image: "🥤" },
    { id: 8, name: "Cold Coffee Can", price: 60, category: "Beverages", image: "☕" },
    { id: 18, name: "Red Bull Energy Drink", price: 115, category: "Beverages", image: "🔋" },
    { id: 19, name: "Real Tropicana Juice", price: 105, category: "Beverages", image: "🧃" },
    { id: 20, name: "Bisleri Water (1L)", price: 20, category: "Beverages", image: "💧" }
];

let cart = [];

// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const productGrid = document.getElementById("product-grid");

// ==========================================
// 3. STOREFRONT RENDERING (Swimlanes & Sorting)
// ==========================================
function renderProducts() {
    productGrid.innerHTML = "";

    // Find all unique categories dynamically
    const categories = [...new Set(products.map(p => p.category))];

    // Loop through each category and build a horizontal row
    categories.forEach(category => {
        
        // 1. Filter the array for this specific category
        let itemsInCategory = products.filter(p => p.category === category);

        // 2. Apply the sorting logic
        const sortDropdown = document.getElementById("sort-dropdown");
        const currentSort = sortDropdown ? sortDropdown.value : "default";
        
        if (currentSort === "price-low") {
            itemsInCategory.sort((a, b) => a.price - b.price);
        } else if (currentSort === "price-high") {
            itemsInCategory.sort((a, b) => b.price - a.price);
        } else if (currentSort === "name-a-z") {
            itemsInCategory.sort((a, b) => a.name.localeCompare(b.name)); 
        }

        // 3. Build the UI wrappers
        const section = document.createElement("div");
        section.classList.add("category-section");

        section.innerHTML = `
            <div class="category-heading">
                ${category} 
                <span>See All ></span>
            </div>
        `;

        const scrollContainer = document.createElement("div");
        scrollContainer.classList.add("horizontal-scroll");

        // 4. Draw the newly sorted cards
        itemsInCategory.forEach((product) => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <div class="product-img">${product.image}</div>
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

// Ensure the dropdown triggers a re-render when changed
const sortDropdown = document.getElementById("sort-dropdown");
if(sortDropdown) sortDropdown.addEventListener("change", renderProducts);


// ==========================================
// 4. CART ENGINE & LOGIC
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
    }
}

// ==========================================
// 5. NAVIGATION (SPA & Mobile Bottom Nav)
// ==========================================
const storeView = document.getElementById("store-view");
const cartView = document.getElementById("cart-view");
const cartNavBtn = document.getElementById("cart-nav-btn");
const backToStoreBtn = document.getElementById("back-to-store");

// Desktop Nav
if(cartNavBtn) {
    cartNavBtn.addEventListener("click", () => {
        storeView.classList.remove("active");
        storeView.classList.add("hidden");
        cartView.classList.remove("hidden");
        cartView.classList.add("active");
        renderCart();
    });
}

if(backToStoreBtn) {
    backToStoreBtn.addEventListener("click", () => {
        cartView.classList.remove("active");
        cartView.classList.add("hidden");
        storeView.classList.remove("hidden");
        storeView.classList.add("active");
    });
}

// Mobile App Bottom Nav Logic
const navHome = document.getElementById("nav-home");
const navCartBtn = document.getElementById("nav-cart-btn");

if(navHome) {
    navHome.addEventListener("click", () => {
        cartView.classList.remove("active");
        cartView.classList.add("hidden");
        storeView.classList.remove("hidden");
        storeView.classList.add("active");

        navHome.classList.add("active");
        if(navCartBtn) navCartBtn.classList.remove("active");
    });
}

if(navCartBtn) {
    navCartBtn.addEventListener("click", () => {
        storeView.classList.remove("active");
        storeView.classList.add("hidden");
        cartView.classList.remove("hidden");
        cartView.classList.add("active");
        
        navCartBtn.classList.add("active");
        if(navHome) navHome.classList.remove("active");
        
        renderCart();
    });
}

// ==========================================
// 6. RENDER CART PAGE & BILLING MATH
// ==========================================
const cartItemsList = document.getElementById("cart-items-list");

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
                <span style="font-size: 2rem;">${item.image}</span>
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

function calculateTotals() {
    const subtotalSpan = document.getElementById("subtotal");
    const totalSpan = document.getElementById("total");
    const taxSpan = document.getElementById("tax");

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    if(subtotalSpan) subtotalSpan.innerText = `₹${subtotal.toFixed(2)}`;
    if(taxSpan) taxSpan.innerText = `₹${tax.toFixed(2)}`;
    if(totalSpan) totalSpan.innerText = `₹${total.toFixed(2)}`;
}

// ==========================================
// 7. TOAST NOTIFICATIONS
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
// 8. MOBILE iOS SEARCH LOGIC
// ==========================================
const navSearchBtn = document.getElementById("nav-search");
const searchOverlay = document.getElementById("mobile-search-overlay");
const searchInput = document.getElementById("mobile-search-input");
const closeSearch = document.getElementById("close-search");
const searchResults = document.getElementById("search-results-container");

if(navSearchBtn) {
    navSearchBtn.addEventListener("click", () => {
        searchOverlay.classList.remove("hidden");
        searchInput.focus(); 
    });
}

if(closeSearch) {
    closeSearch.addEventListener("click", () => {
        searchOverlay.classList.add("hidden");
        searchInput.value = ""; 
        searchResults.innerHTML = ""; 
    });
}

if(searchInput) {
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
                    <span style="font-size:2rem;">${product.image}</span>
                    <div>
                        <div style="font-weight:600; color:var(--text-main);">${product.name}</div>
                        <div style="color:var(--text-muted); font-size:0.9rem;">₹${product.price}</div>
                    </div>
                </div>
            `;

            // Build the button securely
            const addBtn = document.createElement("button");
            addBtn.type = "button"; 
            addBtn.innerText = "ADD";
            addBtn.style.cssText = "padding: 8px 15px; background: var(--primary); border:none; border-radius:6px; font-weight:bold; color:#064E3B; cursor:pointer;";
            
            // Attach the logic safely
            addBtn.addEventListener("click", (e) => {
                e.preventDefault(); 
                e.stopPropagation(); 
                
                addToCart(product.id); 
                searchOverlay.classList.add("hidden"); 
                searchInput.value = ""; 
                searchResults.innerHTML = ""; 
                
                showToast(`Added ${product.name} to bag!`); 
            });

            div.appendChild(addBtn);
            searchResults.appendChild(div);
        });
    });
}

// ==========================================
// 9. KICKOFF THE APP
// ==========================================
renderProducts();