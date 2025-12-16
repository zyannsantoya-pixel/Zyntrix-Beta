// Product Data
const products = [
    {
        id: 1,
        name: "Zyntrix Complete Set",
        price: 16799,
        image: "https://images.unsplash.com/photo-1625780289233-321883d99ac1?w=800&h=600&fit=crop",
        description: "Complete gadget bundle including wireless keyboard, mouse, and headset. Perfect starter pack for your gaming or productivity setup."
    },
    {
        id: 2,
        name: "RGB Mechanical Keyboard",
        price: 8399,
        image: "https://images.unsplash.com/photo-1643869094397-962f806fe3ab?w=800&h=600&fit=crop",
        description: "Premium RGB mechanical keyboard with customizable switches and per-key RGB lighting. Perfect for gaming and typing."
    },
    {
        id: 3,
        name: "Wireless Gaming Mouse",
        price: 4479,
        image: "https://images.unsplash.com/photo-1631749352438-7d576312185d?w=800&h=600&fit=crop",
        description: "High-precision wireless gaming mouse with 16000 DPI sensor, lightweight design, and customizable RGB lighting."
    },
    {
        id: 4,
        name: "Premium Wireless Headset",
        price: 11199,
        image: "https://images.unsplash.com/photo-1763822129929-bba1b521c8e6?w=800&h=600&fit=crop",
        description: "Premium noise-cancelling wireless headset with crystal-clear audio and comfortable over-ear design."
    },
    {
        id: 5,
        name: "4K Ultra HD Monitor",
        price: 18999,
        image: "https://cdn.thewirecutter.com/wp-content/media/2025/06/BEST-4K-MONITORS-5554.jpg",
        description: "32-inch 4K Ultra HD gaming monitor with 144Hz refresh rate, HDR support, and curved design for immersive viewing."
    },
    {
        id: 6,
        name: "Gaming Laptop Pro",
        price: 89999,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
        description: "High-performance gaming laptop with RTX 4080, Intel i9 processor, 32GB RAM, and 1TB SSD. Perfect for gaming and content creation."
    }
];

// Initialize Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('zyntrixCart')) || [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
const modal = document.getElementById('product-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalAddBtn = document.getElementById('modal-add-btn');

// Helper to format currency
function formatCurrency(amount) {
    return '₱' + amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Render Products
function renderProducts() {
    if (!productGrid) return; // Only render if grid exists (products.html)
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3>${product.name}</h3>
                <span class="price">${formatCurrency(product.price)}</span>
                <button class="btn-primary" onclick="openModal(${product.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

// Update Cart Count
function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('zyntrixCart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
        closeModal();
    }
}

// Inject Cart Modal HTML
function injectCartModal() {
    const cartModalHTML = `
    <div id="cart-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn" onclick="toggleCart()">&times;</span>
            <h2>Your Cart</h2>
            <div class="cart-items" id="cart-items">
                <!-- Cart items injected here -->
                <p style="text-align:center; padding: 20px;">Your cart is empty.</p>
            </div>
            <div class="cart-total">
                Total: <span id="cart-total-price">₱0.00</span>
            </div>
            <div style="text-align: right; margin-top: 20px;">
                <button class="btn-secondary" onclick="toggleCart()">Continue Shopping</button>
                <button class="btn-primary" onclick="checkout()">Checkout</button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', cartModalHTML);
}

// Toggle Cart Modal
window.toggleCart = function() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) return;
    
    if (cartModal.style.display === 'flex') {
        cartModal.style.display = 'none';
    } else {
        renderCart();
        cartModal.style.display = 'flex';
    }
};

// Render Cart Items
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (!cartItemsContainer || !cartTotalPrice) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Your cart is empty.</p>';
        cartTotalPrice.textContent = '₱0.00';
        return;
    }
    
    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
        <div class="cart-item">
            <div style="display:flex; align-items:center;">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
        </div>
        `;
    }).join('');
    
    cartTotalPrice.textContent = formatCurrency(total);
}

// Remove from Cart
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('zyntrixCart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
};

// Checkout
window.checkout = function() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Proceeding to checkout... (This is a demo)");
    cart = [];
    localStorage.setItem('zyntrixCart', JSON.stringify(cart));
    updateCartCount();
    toggleCart();
};

// Modal Functions
window.openModal = function(productId) {
    if (!modal) return;
    
    const product = products.find(p => p.id === productId);
    if (product) {
        modalImg.src = product.image;
        modalTitle.textContent = product.name;
        modalDesc.textContent = product.description;
        modalPrice.textContent = formatCurrency(product.price);
        
        // Update Add Button to pass specific ID
        modalAddBtn.onclick = () => addToCart(product.id);
        
        modal.style.display = 'flex';
    }
};

window.closeModal = function() {
    if (modal) {
        modal.style.display = 'none';
    }
};

// Close modal when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cart-modal');
    if (modal && event.target == modal) {
        closeModal();
    }
    if (cartModal && event.target == cartModal) {
        toggleCart();
    }
};

// Contact Form Handler
window.handleContactSubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Thanks ${name}! We've received your message and will get back to you shortly.`);
    event.target.reset();
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    injectCartModal();
    renderProducts();
    updateCartCount();
});

// Auth Logic
window.handleLogin = function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    // Simulate login
    localStorage.setItem('zyntrixUser', JSON.stringify({ email: email }));
    alert('Login successful! Redirecting to Home...');
    window.location.href = 'index.html';
};

window.handleRegister = function(event) {
    event.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    // Simulate register
    localStorage.setItem('zyntrixUser', JSON.stringify({ name: name, email: email }));
    alert('Registration successful! Redirecting to Login Page...');
    window.location.href = 'login.html';
};

window.logout = function() {
    localStorage.removeItem('zyntrixUser');
    alert('Logged out.');
    window.location.href = 'index.html';
};

function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('zyntrixUser'));
    const authLink = document.getElementById('auth-link');
    
    if (authLink) {
        if (user) {
            authLink.innerHTML = `<a href="#" onclick="logout()">Logout</a>`;
        } else {
            // Check if we are on login page to set active class? 
            // For simplicity, just set link.
            authLink.innerHTML = `<a href="login.html">Login</a>`;
        }
    }
}

// Update init
document.addEventListener('DOMContentLoaded', () => {
    injectCartModal();
    renderProducts();
    updateCartCount();
    updateAuthUI();
});
