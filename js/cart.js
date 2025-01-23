// Gestion du panier
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    // Ajouter un produit au panier
    addItem(product) {
        if (!product || !product.id || !product.name || !product.price) {
            console.error('Produit invalide');
            return;
        }

        try {
            const existingItem = this.items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity = Math.min(99, existingItem.quantity + (product.quantity || 1));
            } else {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price),
                    image: product.image,
                    quantity: Math.min(99, product.quantity || 1)
                });
            }

            this.saveCart();
            this.updateCartCount();
            this.showNotification('Produit ajouté au panier');
            
            // Redirection plus fluide
            setTimeout(() => {
                const cartPath = window.location.href.includes('/products/') ? '../cart.html' : 'cart.html';
                window.location.href = cartPath;
            }, 800);

        } catch (error) {
            console.error('Erreur lors de l\'ajout au panier:', error);
            this.showNotification('Erreur lors de l\'ajout au panier', 'error');
        }
    }

    // Retirer un produit du panier
    removeItem(productId) {
        try {
            this.items = this.items.filter(item => item.id !== productId);
            this.saveCart();
            this.updateCartCount();
            displayCart();
            this.showNotification('Produit retiré du panier');
        } catch (error) {
            console.error('Erreur lors de la suppression du produit:', error);
        }
    }

    // Mettre à jour la quantité d'un produit
    updateItemQuantity(productId, quantity) {
        try {
            const item = this.items.find(item => item.id === productId);
            if (item && quantity >= 1 && quantity <= 99) {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartCount();
                displayCart();
                this.showNotification('Quantité mise à jour');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la quantité:', error);
        }
    }

    // Sauvegarder le panier dans le localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Mettre à jour le compteur du panier
    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    // Afficher une notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        notification.textContent = message;
        
        // Supprimer les notifications existantes
        const existingNotifications = document.querySelectorAll('.cart-notification');
        existingNotifications.forEach(notif => notif.remove());
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Fonction pour afficher le panier
function displayCart() {
    const cartContainer = document.querySelector('.cart-items');
    const cartTotals = document.querySelectorAll('.cart-total');
    if (!cartContainer || !cartTotals.length) return;

    try {
        const cart = new Cart();

        if (cart.items.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <p>Votre panier est vide</p>
                    <a href="index.html" class="continue-shopping">
                        <i class="fas fa-arrow-left"></i>
                        Continuer mes achats
                    </a>
                </div>
            `;
            cartTotals.forEach(total => total.textContent = '0.00 €');
            return;
        }

        let total = 0;
        cartContainer.innerHTML = cart.items.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="cart-item" data-id="${item.id}">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
                    </div>
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p class="item-price">${item.price.toFixed(2)} €</p>
                        <div class="quantity-controls">
                            <button onclick="cart.updateItemQuantity('${item.id}', ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                            <span>${item.quantity}</span>
                            <button onclick="cart.updateItemQuantity('${item.id}', ${item.quantity + 1})" ${item.quantity >= 99 ? 'disabled' : ''}>+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="cart.removeItem('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');

        cartTotals.forEach(totalElement => {
            totalElement.textContent = `${total.toFixed(2)} €`;
        });

    } catch (error) {
        console.error('Erreur lors de l\'affichage du panier:', error);
        cartContainer.innerHTML = '<p>Une erreur est survenue lors du chargement du panier.</p>';
    }
}

// Initialiser le panier
const cart = new Cart();

// Initialiser l'affichage du panier au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    try {
        displayCart();
        
        // Gestion des événements de quantité globaux
        document.addEventListener('click', (e) => {
            if (e.target.matches('.qty-btn')) {
                const input = e.target.closest('.quantity-selector').querySelector('input');
                const value = parseInt(input.value);
                
                if (e.target.classList.contains('minus') && value > 1) {
                    input.value = value - 1;
                } else if (e.target.classList.contains('plus') && value < 99) {
                    input.value = value + 1;
                }
            }
        });
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
});

// Fonction pour ajouter au panier depuis les pages produits
function addToCart(event, product) {
    event.preventDefault();
    const cart = new Cart();
    cart.addItem(product);
}

// Ajouter cette fonction à la fin du fichier cart.js
function proceedToCheckout() {
    const cart = new Cart();
    if (cart.items.length > 0) {
        window.location.href = 'checkout.html';
    } else {
        cart.showNotification('Votre panier est vide', 'error');
    }
} 