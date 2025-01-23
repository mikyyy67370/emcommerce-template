document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments
    const sizeButtons = document.querySelectorAll('.size-btn');
    const colorButtons = document.querySelectorAll('.color-btn');
    const quantityInput = document.querySelector('.quantity-selector input');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    // Variables pour stocker les sélections
    let selectedSize = document.querySelector('.size-btn.active').dataset.size;
    let selectedColor = document.querySelector('.color-btn.active').dataset.color;

    // Gestion de la sélection de taille
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSize = btn.dataset.size;
            updateAddToCartButton();
        });
    });

    // Gestion de la sélection de couleur
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedColor = btn.dataset.color;
            updateAddToCartButton();
        });
    });

    // Gestion de la quantité
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
            updateAddToCartButton();
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value < 10) {
            quantityInput.value = value + 1;
            updateAddToCartButton();
        }
    });

    // Validation de la quantité
    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (value < 1) quantityInput.value = 1;
        if (value > 10) quantityInput.value = 10;
    });

    // Mise à jour du bouton Add to Cart
    function updateAddToCartButton() {
        const quantity = parseInt(quantityInput.value);
        addToCartBtn.textContent = `Add to Cart (${selectedSize} - ${selectedColor} - Qty: ${quantity})`;
    }

    // Initialisation
    updateAddToCartButton();

    // Gestion de l'ajout au panier
    addToCartBtn.addEventListener('click', () => {
        const product = {
            id: 'product-1',
            name: document.querySelector('.product-info h1').textContent,
            price: parseFloat(document.querySelector('.current-price').textContent.replace('$', '')),
            image: document.querySelector('.main-image img').src,
            quantity: parseInt(quantityInput.value),
            size: selectedSize,
            color: selectedColor
        };

        const cart = new Cart();
        cart.addItem(product);
        window.location.href = 'cart.html';
    });

    // Gestion de la galerie d'images
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-gallery img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Mise à jour de l'image principale
            mainImage.src = thumb.src;
            
            // Mise à jour de la classe active
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // Gestion du sélecteur de couleur
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
});

function openSizeGuide() {
    document.getElementById('sizeGuideModal').style.display = 'flex';
}

function closeSizeGuide() {
    document.getElementById('sizeGuideModal').style.display = 'none';
}

// Fermer le modal en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById('sizeGuideModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
} 