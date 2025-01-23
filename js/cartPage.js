// Gestion de la page panier
class CartPage {
    constructor() {
        this.cart = new Cart();
        this.initPage();
    }

    initPage() {
        this.renderCartItems();
        this.updateSummary();
        this.setupEventListeners();
    }

    renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = '';

        if (this.cart.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                </div>
            `;
            return;
        }

        this.cart.items.forEach(item => {
            const itemElement = this.createCartItemElement(item);
            cartItemsContainer.appendChild(itemElement);
        });
    }

    createCartItemElement(item) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="item-actions">
                    <div class="quantity-selector">
                        <button class="qty-btn minus" data-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="99" readonly>
                        <button class="qty-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <a href="#" class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                        Remove
                    </a>
                </div>
            </div>
        `;
        return div;
    }

    updateSummary() {
        const subtotal = this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;

        document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.tax').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.total-price').textContent = `$${total.toFixed(2)}`;
        document.querySelector('.cart-total-items').textContent = this.cart.items.length;
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('qty-btn')) {
                const id = e.target.dataset.id;
                const isPlus = e.target.classList.contains('plus');
                this.updateQuantity(id, isPlus);
            }

            if (e.target.closest('.remove-item')) {
                e.preventDefault();
                const id = e.target.closest('.remove-item').dataset.id;
                this.removeItem(id);
            }
        });

        // Ajout de l'écouteur pour le bouton checkout
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.cart.items.length > 0) {
                    window.location.href = 'checkout.html';
                } else {
                    alert('Your cart is empty');
                }
            });
        }
    }

    updateQuantity(id, isPlus) {
        const item = this.cart.items.find(item => item.id === id);
        if (item) {
            if (isPlus && item.quantity < 99) {
                item.quantity++;
            } else if (!isPlus && item.quantity > 1) {
                item.quantity--;
            }
            this.cart.saveCart();
            this.renderCartItems();
            this.updateSummary();
        }
    }

    removeItem(id) {
        this.cart.items = this.cart.items.filter(item => item.id !== id);
        this.cart.saveCart();
        this.cart.updateCartCount();
        this.renderCartItems();
        this.updateSummary();
    }
}

// Initialiser la page panier
document.addEventListener('DOMContentLoaded', () => {
    new CartPage();
}); 