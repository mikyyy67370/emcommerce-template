document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupération des valeurs du formulaire
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
        console.log('Form Data:', formData);
        
        // Animation de succès
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#28a745';

        // Reset du formulaire après 2 secondes
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            submitBtn.style.background = '#000';
            
            // Afficher une notification
            alert('Thank you for your message. We will get back to you soon!');
        }, 2000);
    });
}); 