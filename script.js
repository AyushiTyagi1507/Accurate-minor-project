const products = [
  {
    id: 1,
    name: "Ceramic Decorative Pot",
    category: "pots",
    price: 45,
    rating: 4.8,
    reviews: 124,
    image: "Images/Gamla4.jpg",
    description:
      "Beautiful ceramic pot with modern design, perfect for indoor decoration and plants.",
  },
  {
    id: 2,
    name: "Macrame Wall Hanger",
    category: "hangers",
    price: 32,
    rating: 4.6,
    reviews: 89,
    image: "/Images/Hanger1.jpg",
    description:
      "Handcrafted macrame wall hanger with boho style, perfect for plants or decorative items.",
  },
  {
    id: 3,
    name: "Glass Decorative Vase",
    category: "vases",
    price: 28,
    rating: 4.9,
    reviews: 156,
    image: "/Images/Gamla2.jpg",
    description:
      "Elegant glass vase with contemporary design, ideal for flowers or as standalone decor.",
  },
  {
    id: 4,
    name: "Wooden Wall Shelf",
    category: "accessories",
    price: 65,
    rating: 4.7,
    reviews: 78,
    image: "/Images/Hanger1.jpg",
    description:
      "Rustic wooden wall shelf for displaying decorative items and small plants.",
  },
  {
    id: 5,
    name: "Metal Plant Stand",
    category: "accessories",
    price: 38,
    rating: 4.5,
    reviews: 92,
    image: "/Images/Metal-Plant-Stand.jpg",
    description:
      "Sleek metal plant stand with minimalist design, perfect for elevating your decor.",
  },
  {
    id: 6,
    name: "Terracotta Pot Set",
    category: "pots",
    price: 42,
    rating: 4.6,
    reviews: 67,
    image: "/Images/Terracotta-Pot-Set.jpg",
    description:
      "Set of 3 terracotta pots in different sizes, perfect for herbs and small plants.",
  },
  {
    id: 7,
    name: "Brass Wall Hook",
    category: "hangers",
    price: 22,
    rating: 4.8,
    reviews: 134,
    image: "/Images/Brass-Wall-Hook.jpg",
    description:
      "Vintage-style brass wall hook, perfect for hanging coats, bags, or decorative items.",
  },
  {
    id: 8,
    name: "Crystal Decorative Bowl",
    category: "vases",
    price: 78,
    rating: 4.9,
    reviews: 45,
    image: "/Images/Crystal-Decorative-Bowl.jpg",
    description:
      "Stunning crystal bowl with elegant design, perfect as a centerpiece or decorative accent.",
  },
];

let cart = [];
let wishlist = [];
let filteredProducts = [...products];

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  setupScrollAnimations();
  setupHeaderScroll();
  updateCartCount();
  updateCartDisplay();
});

// Header scroll effect
function setupHeaderScroll() {
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Setup scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Render products
function renderProducts() {
  const productsGrid = document.getElementById("productsGrid");
  productsGrid.innerHTML = "";

  filteredProducts.forEach((product) => {
    const stars =
      "★".repeat(Math.floor(product.rating)) +
      "☆".repeat(5 - Math.floor(product.rating));
    const isWishlisted = wishlist.includes(product.id);

    const productCard = document.createElement("div");
    productCard.className = "product-card fade-in";
    productCard.innerHTML = `
                    <button class="quick-view-btn" onclick="quickView(${
                      product.id
                    })">
                        <i class="fas fa-eye"></i>
                    </button>
                    <img src="${product.image}" alt="${
      product.name
    }" class="product-image">
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">$${product.price}</div>
                        <div class="product-rating">
                            <span class="stars">${stars}</span>
                            <span class="rating-text">${product.rating} (${
      product.reviews
    } reviews)</span>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-primary btn-small" onclick="addToCart(${
                              product.id
                            })">
                                <i class="fas fa-shopping-cart"></i>
                                Add to Cart
                            </button>
                            <button class="wishlist-btn ${
                              isWishlisted ? "active" : ""
                            }" onclick="toggleWishlist(${product.id})">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                `;
    productsGrid.appendChild(productCard);
  });

  // Re-observe new elements for animations
  document.querySelectorAll(".product-card.fade-in").forEach((el) => {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
  });
}

function filterProducts(category) {
  // Update active filter button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  const targetBtn = document.querySelector(
    `.filter-btn[onclick="filterProducts('${category}')"]`
  );
  if (targetBtn) {
    targetBtn.classList.add("active");
  }

  // Filter products
  if (category === "all") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(
      (product) => product.category === category
    );
  }

  renderProducts();
}

function navigateToCategory(category) {
  // Scroll to products section
  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  // Wait for scroll to complete, then filter products
  setTimeout(() => {
    filterProducts(category);
  }, 500);
}

// Search products
function searchProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  if (searchTerm.trim() === "") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }
  renderProducts();
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCartCount();
  updateCartDisplay();
  showToast(`${product.name} added to cart!`, "success");
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartCount();
  updateCartDisplay();
  showToast("Item removed from cart", "success");
}

// Update cart quantity
function updateCartQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartCount();
      updateCartDisplay();
    }
  }
}

// Update cart count
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<div style="text-align: center; padding: 2rem; color: var(--muted-foreground);">Your cart is empty</div>';
    cartTotal.innerHTML = "";
    return;
  }

  // Render cart items
  cartItems.innerHTML = cart
    .map(
      (item) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price}</div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                            <span style="margin: 0 0.5rem; font-weight: 600;">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                            <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 0.5rem; color: #ef4444;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `
    )
    .join("");

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  cartTotal.innerHTML = `
                <div class="cart-total-row">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="cart-total-row">
                    <span>Shipping:</span>
                    <span>${
                      shipping === 0 ? "Free" : "$" + shipping.toFixed(2)
                    }</span>
                </div>
                <div class="cart-total-row cart-total-final">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="checkout()">
                    <i class="fas fa-credit-card"></i>
                    Checkout
                </button>
            `;
}

function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");

  cartSidebar.classList.add("open");
  cartOverlay.classList.add("open");
  updateCartDisplay();
}

// Close cart sidebar
function closeCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");

  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("open");
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    showToast("Your cart is empty", "error");
    return;
  }

  showToast("Redirecting to checkout...", "success");
  // Here you would typically redirect to a checkout page
  setTimeout(() => {
    alert("Checkout functionality would be implemented here");
  }, 1000);
}
/* ===============================
    WISHLIST TOGGLE FUNCTION
 ================================= */
function toggleWishlist(productId) {
  const product = products.find((p) => p.id === productId);
  const index = wishlist.indexOf(productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`${product.name} removed from wishlist`, "success");
  } else {
    wishlist.push(productId);
    showToast(`${product.name} added to wishlist!`, "success");
  }

  renderProducts(); // Re-render product list
  updateWishlistCount(); // Update wishlist count
  renderWishlist(); // ⭐ VERY IMPORTANT → show wishlist items
}

/* ===============================
           UPDATE WISHLIST COUNT
        ================================= */
function updateWishlistCount() {
  const countEl = document.getElementById("wishlist-count");
  if (countEl) {
    countEl.textContent = wishlist.length;
  }
}

/* ===============================
           RENDER WISHLIST ON SCREEN
        ================================= */
function renderWishlist() {
  const container = document.getElementById("wishlist-container");
  if (!container) return;

  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = `<p class="empty">No items in wishlist.</p>`;
    return;
  }

  wishlist.forEach((id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    container.innerHTML += `
            <div class="wishlist-item">
                <img src="${product.image}" alt="" class="wish-img">
                
                <div>
                    <h3>${product.name}</h3>
                    <p>₹${product.price}</p>
                </div>

                <button onclick="toggleWishlist(${product.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;
  });
}

function toggleWishlistSidebar() {
  const sidebar = document.getElementById("wishlistSidebar");
  const overlay = document.getElementById("wishlistOverlay");

  sidebar.classList.toggle("open");
  overlay.classList.toggle("open");

  // Sidebar open hote hi wishlist render karo
  if (sidebar.classList.contains("open")) {
    renderWishlist();
  }
}

/* CALL AT PAGE LOAD */
updateWishlistCount();
renderWishlist();

// Quick view modal
function quickView(productId) {
  const product = products.find((p) => p.id === productId);
  const modal = document.getElementById("quickViewModal");
  const modalContent = document.getElementById("modalContent");

  const stars =
    "★".repeat(Math.floor(product.rating)) +
    "☆".repeat(5 - Math.floor(product.rating));

  modalContent.innerHTML = `
                <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                    <img src="${product.image}" alt="${
    product.name
  }" style="width: 250px; height: 250px; object-fit: cover; border-radius: var(--radius);">
                    <div style="flex: 1; min-width: 250px;">
                        <div style="color: var(--muted-foreground); margin-bottom: 0.5rem;">${
                          product.category.charAt(0).toUpperCase() +
                          product.category.slice(1)
                        }</div>
                        <h2 style="color: var(--primary); margin-bottom: 1rem;">${
                          product.name
                        }</h2>
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--secondary); margin-bottom: 1rem;">$${
                          product.price
                        }</div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                            <span style="color: #fbbf24;">${stars}</span>
                            <span style="color: var(--muted-foreground);">${
                              product.rating
                            } (${product.reviews} reviews)</span>
                        </div>
                        <p style="margin-bottom: 2rem; line-height: 1.6;">${
                          product.description
                        }</p>
                        <div style="display: flex; gap: 1rem;">
                            <button class="btn btn-primary" onclick="addToCart(${
                              product.id
                            }); closeModal();">
                                <i class="fas fa-shopping-cart"></i>
                                Add to Cart
                            </button>
                            <button class="btn btn-secondary" onclick="toggleWishlist(${
                              product.id
                            })">
                                <i class="fas fa-heart"></i>
                                ${
                                  wishlist.includes(product.id)
                                    ? "Remove from"
                                    : "Add to"
                                } Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            `;

  modal.style.display = "block";
}

// Close modal
function closeModal() {
  document.getElementById("quickViewModal").style.display = "none";
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navMenu = document.getElementById("navMenu");
  const btnIcon = document.querySelector(".mobile-menu-btn i");

  navMenu.classList.toggle("active");

  // Toggle icon
  if (navMenu.classList.contains("active")) {
    btnIcon.classList.remove("fa-bars");
    btnIcon.classList.add("fa-times");
  } else {
    btnIcon.classList.remove("fa-times");
    btnIcon.classList.add("fa-bars");
  }
}

// Show toast notification
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Handle form submission
// document.querySelector('.contact-form').addEventListener('submit', function (e) {
//     e.preventDefault();
//     showToast('Message sent successfully!', 'success');
//     this.reset();
// });

// Handle search on Enter key
document
  .getElementById("searchInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchProducts();
    }
  });

// Close modal when clicking outside
window.addEventListener("click", function (e) {
  const modal = document.getElementById("quickViewModal");
  if (e.target === modal) {
    closeModal();
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbzajp3LZX5efFMqZ2E4XPRuUtWZPL0FZgs2WvO1fKygzWXwJkEMhrieHbiCznJi79WU/exec";

const form = document.querySelector(".contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(formData),
  })
    .then((response) => {
      alert("Form submitted successfully!");
      form.reset();
    })
    .catch((error) => alert("Error! " + error.message));
});
