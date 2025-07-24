// Sample product data
const products = [
    {
        id: 1,
        name: 'Custom Photo Necklace',
        retailer: 'JewelCraft Studio',
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.9,
        reviews: 245,
        image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Bestseller',
        category: 'jewelry'
    },
    {
        id: 2,
        name: 'Personalized Baby Blanket',
        retailer: 'Little Dreams Co',
        price: 34.99,
        originalPrice: null,
        rating: 5.0,
        reviews: 98,
        image: 'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'New',
        category: 'baby'
    },
    {
        id: 3,
        name: 'Engraved Wedding Ring Box',
        retailer: 'Eternal Moments',
        price: 45.99,
        originalPrice: 65.99,
        rating: 4.8,
        reviews: 156,
        image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Sale',
        category: 'wedding'
    },
    {
        id: 4,
        name: 'Custom Name Bracelet',
        retailer: 'Artisan Jewelry Co',
        price: 29.99,
        originalPrice: null,
        rating: 4.7,
        reviews: 203,
        image: 'https://images.pexels.com/photos/1454502/pexels-photo-1454502.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Premium',
        category: 'jewelry'
    },
    {
        id: 5,
        name: 'Personalized Baby Onesie',
        retailer: 'Tiny Treasures',
        price: 19.99,
        originalPrice: 24.99,
        rating: 4.6,
        reviews: 89,
        image: 'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Sale',
        category: 'baby'
    },
    {
        id: 6,
        name: 'Custom Wedding Photo Frame',
        retailer: 'Memory Makers',
        price: 39.99,
        originalPrice: null,
        rating: 4.9,
        reviews: 167,
        image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400',
        badge: 'Bestseller',
        category: 'wedding'
    }
];

// DOM Elements
const authBtn = document.getElementById('authBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const productsGrid = document.getElementById('productsGrid');
const allProductsGrid = document.getElementById('allProductsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');

// State
let isLoggedIn = false;
let currentUser = null;
let favorites = [];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    loadAllProducts();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Auth dropdown
    authBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
    });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Newsletter form
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing! We\'ll send you amazing deals soon.');
        this.reset();
    });

    // Auth forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);

    // Product filters
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

// Product Functions
function loadFeaturedProducts() {
    const featuredProducts = products.slice(0, 4);
    renderProducts(featuredProducts, productsGrid);
}

function loadAllProducts() {
    if (allProductsGrid) {
        renderProducts(products, allProductsGrid);
    }
}

function renderProducts(productList, container) {
    if (!container) return;
    
    container.innerHTML = productList.map(product => `
        <div class="product-card" onclick="handleProductClick(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge badge-${product.badge.toLowerCase()}">${product.badge}</div>
            </div>
            <div class="product-info">
                <div class="product-retailer">${product.retailer}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="rating-stars">
                        ${'★'.repeat(Math.floor(product.rating))}
                    </div>
                    <span class="rating-text">${product.rating} (${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function handleProductClick(productId) {
    if (!isLoggedIn) {
        showLogin();
        return;
    }
    
    // If logged in, show product details or redirect to purchase
    alert('Redirecting to product purchase page...');
}

function filterProducts() {
    const categoryValue = categoryFilter ? categoryFilter.value : '';
    const priceValue = priceFilter ? priceFilter.value : '';
    
    let filteredProducts = products;
    
    if (categoryValue) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryValue);
    }
    
    if (priceValue) {
        filteredProducts = filteredProducts.filter(product => {
            if (priceValue === '0-50') return product.price < 50;
            if (priceValue === '50-100') return product.price >= 50 && product.price <= 100;
            if (priceValue === '100+') return product.price > 100;
            return true;
        });
    }
    
    renderProducts(filteredProducts, allProductsGrid);
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.retailer.toLowerCase().includes(searchTerm)
    );
    
    if (allProductsGrid && document.getElementById('productsModal').classList.contains('show')) {
        renderProducts(filteredProducts, allProductsGrid);
    }
}

// Navigation Functions
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function showAllProducts() {
    showModal('productsModal');
    loadAllProducts();
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
    document.body.style.overflow = 'auto';
}

function showLogin() {
    closeModal('signupModal');
    showModal('loginModal');
}

function showSignup() {
    closeModal('loginModal');
    showModal('signupModal');
}

function switchToSignup() {
    closeModal('loginModal');
    showModal('signupModal');
}

function switchToLogin() {
    closeModal('signupModal');
    showModal('loginModal');
}

// Authentication Functions
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation (in real app, this would be server-side)
    if (email && password) {
        isLoggedIn = true;
        currentUser = { email: email };
        updateAuthUI();
        closeModal('loginModal');
        alert('Welcome back! You can now browse and purchase products.');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Simple validation (in real app, this would be server-side)
    if (name && email && password) {
        isLoggedIn = true;
        currentUser = { name: name, email: email };
        updateAuthUI();
        closeModal('signupModal');
        alert('Account created successfully! Welcome to Stunhaul.');
    }
}

function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (isLoggedIn) {
        authBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${currentUser.name || 'Account'}</span>
            <i class="fas fa-chevron-down"></i>
        `;
        
        dropdownMenu.innerHTML = `
            <a href="#" onclick="showProfile()">Profile</a>
            <a href="#" onclick="showOrders()">Orders</a>
            <a href="#" onclick="logout()">Logout</a>
        `;
    }
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    favorites = [];
    
    const authBtn = document.getElementById('authBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    authBtn.innerHTML = `
        <i class="fas fa-user"></i>
        <span>Account</span>
        <i class="fas fa-chevron-down"></i>
    `;
    
    dropdownMenu.innerHTML = `
        <a href="#" onclick="showLogin()">Sign In</a>
        <a href="#" onclick="showSignup()">Sign Up</a>
    `;
    
    alert('You have been logged out successfully.');
}

function showProfile() {
    alert('Profile page would open here.');
}

function showOrders() {
    alert('Orders page would open here.');
}

// Favorites Functions
function toggleFavorite(productId) {
    if (!isLoggedIn) {
        showLogin();
        return;
    }
    
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(productId);
    }
    
    // Update UI to reflect favorite status
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    // Update favorite button states based on favorites array
    // This would be implemented when adding favorite buttons to products
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Handle escape key to close modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Add loading animation for better UX
function showLoading() {
    // Add loading spinner or animation
}

function hideLoading() {
    // Remove loading spinner or animation
}

// Initialize animations on scroll (optional enhancement)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .product-card, .category-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when page loads
window.addEventListener('load', initScrollAnimations);