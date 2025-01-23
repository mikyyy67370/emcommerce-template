class Checkout {
    constructor() {
        this.cart = new Cart();
        this.initPage();
        this.setupEventListeners();
    }

    initPage() {
        this.renderOrderSummary();
        this.updateTotals();
    }

    renderOrderSummary() {
        const summaryItems = document.querySelector('.summary-items');
        summaryItems.innerHTML = '';

        this.cart.items.forEach(item => {
            const itemElement = this.createSummaryItemElement(item);
            summaryItems.appendChild(itemElement);
        });
    }

    createSummaryItemElement(item) {
        const div = document.createElement('div');
        div.className = 'summary-item';
        div.innerHTML = `
            <div class="summary-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="summary-item-info">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-price">
                    $${item.price.toFixed(2)} × ${item.quantity}
                </div>
            </div>
        `;
        return div;
    }

    updateTotals() {
        const subtotal = this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;

        document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.tax').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.total-price').textContent = `$${total.toFixed(2)}`;
    }

    setupEventListeners() {
        // Gestion des méthodes de paiement
        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');
            });
        });

        // Gestion du formulaire
        const placeOrderBtn = document.querySelector('.place-order-btn');
        placeOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handlePlaceOrder();
        });
    }

    handlePlaceOrder() {
        // Validation simple
        const requiredFields = document.querySelectorAll('input[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields');
            return;
        }

        // Simulation de la commande
        alert('Order placed successfully!');
        this.cart.items = [];
        this.cart.saveCart();
        window.location.href = '/'; // Redirection vers la page d'accueil
    }
}

// Initialiser le checkout
document.addEventListener('DOMContentLoaded', () => {
    new Checkout();
}); 